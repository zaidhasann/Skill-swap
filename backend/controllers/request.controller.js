import Skill from "../model/Skill.js";
import SkillRequest from "../model/SkillRequest.js";
import SkillContract from "../model/SkillContract.js";

/* ================= SEND REQUEST ================= */
// POST /api/requests
export const sendRequest = async (req, res) => {
  try {
    const { skillId } = req.body;

    const skill = await Skill.findById(skillId);
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    const request = await SkillRequest.create({
      skill: skill._id,
      requester: req.userId,
      owner: skill.owner,
    });

    res.status(201).json(request);
  } catch (err) {
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
  } catch {
    res.status(500).json({ message: "Failed to load requests" });
  }
};

/* ================= UPDATE REQUEST ================= */
// PATCH /api/requests/:id
export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body; // accepted | rejected

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const request = await SkillRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // 🔒 Only skill owner can act
    if (request.owner.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    request.status = status;
    await request.save();

    /* ✅ CREATE CONTRACT ONLY IF ACCEPTED */
    if (status === "accepted") {
      await SkillContract.create({
        skill: request.skill,
        request: request._id,
        owner: request.owner,
        learner: request.requester,
        goal: "Skill learning session",
        durationDays: 7,
      });
    }

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
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
  } catch {
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

    const isOwner =
      request.owner._id.toString() === req.userId.toString();
    const isRequester =
      request.requester._id.toString() === req.userId.toString();

    // 🔐 BOTH can access
    if (!isOwner && !isRequester) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(request);
  } catch {
    res.status(500).json({ message: "Failed to load request" });
  }
};
