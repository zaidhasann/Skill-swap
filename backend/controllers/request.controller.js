import mongoose from "mongoose";
import Skill from "../model/Skill.js";
import SkillRequest from "../model/SkillRequest.js";
import SkillContract from "../model/SkillContract.js";

/* ================= SEND REQUEST ================= */
// POST /api/requests
export const sendRequest = async (req, res) => {
  try {
    const { skillId } = req.body;

    if (!skillId) {
      return res.status(400).json({ message: "Skill ID is required" });
    }

    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    // ❌ Cannot request own skill
    if (skill.owner.toString() === req.userId.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot request your own skill" });
    }

    // ❌ Prevent duplicate pending request
    const exists = await SkillRequest.findOne({
      skill: skill._id,
      requester: req.userId,
      status: "pending",
    });

    if (exists) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const request = await SkillRequest.create({
      skill: skill._id,
      requester: req.userId,
      owner: skill.owner,
    });

    res.status(201).json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Request failed" });
  }
};

/* ================= INCOMING REQUESTS ================= */
// GET /api/requests/my
export const getMyRequests = async (req, res) => {
  try {
    const requests = await SkillRequest.find({
      owner: req.userId,
    })
      .populate("skill", "title")
      .populate("requester", "name email");

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load requests" });
  }
};

/* ================= UPDATE REQUEST ================= */
// PATCH /api/requests/:id
export const updateRequestStatus = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const userId = req.userId.toString();

    // 🔒 Atomic update (auth + pending check)
    const request = await SkillRequest.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: userId,
        status: "pending",
      },
      { status },
      { new: true, session }
    );

    if (!request) {
      return res.status(403).json({
        message: "Request not found, already processed, or not authorized",
      });
    }

    let contract = null;

    // ✅ Create contract only once
    if (status === "accepted") {
      const existingContract = await SkillContract.findOne({
        request: request._id,
      }).session(session);

      if (!existingContract) {
        const created = await SkillContract.create(
          [
            {
              skill: request.skill,
              request: request._id,
              owner: request.owner,
              learner: request.requester,
              goal: "Skill learning session",
              durationDays: 7,
            },
          ],
          { session }
        );

        contract = created[0];
      } else {
        contract = existingContract;
      }
    }

    await session.commitTransaction();
    res.json({ request, contract });
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  } finally {
    session.endSession();
  }
};

/* ================= SENT REQUESTS ================= */
// GET /api/requests/sent
export const getSentRequests = async (req, res) => {
  try {
    const requests = await SkillRequest.find({
      requester: req.userId,
    })
      .populate("skill", "title")
      .populate("owner", "name email");

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load sent requests" });
  }
};

/* ================= REQUEST BY ID (CHAT AUTH) ================= */
// GET /api/requests/:id
export const getRequestById = async (req, res) => {
  try {
    const request = await SkillRequest.findById(req.params.id)
      .populate("skill", "title")
      .populate("requester", "name")
      .populate("owner", "name");

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const userId = req.userId.toString();

    const isOwner = request.owner._id.toString() === userId;
    const isRequester = request.requester._id.toString() === userId;

    // 🔐 Only owner or requester
    if (!isOwner && !isRequester) {
      return res.status(403).json({
        message: "You are not allowed to access this request",
      });
    }

    // 🔒 Chat only after acceptance
    if (request.status !== "accepted") {
      return res
        .status(403)
        .json({ message: "Chat not allowed yet" });
    }

    res.json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load request" });
  }
};
