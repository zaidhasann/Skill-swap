import SkillContract from "../model/SkillContract.js";

/* ================= GET MY CONTRACTS ================= */
// GET /api/contracts/my
export const getMyContracts = async (req, res) => {
  try {
    const contracts = await SkillContract.find({
      $or: [
        { owner: req.userId },
        { learner: req.userId },
      ],
    })
      .populate("skill", "title")
      .populate("owner", "name")
      .populate("learner", "name");

    res.json(contracts);
  } catch {
    res.status(500).json({ message: "Failed to load contracts" });
  }
};

/* ================= GET CONTRACT BY ID ================= */
// GET /api/contracts/:id
export const getContractById = async (req, res) => {
  try {
    const contract = await SkillContract.findById(req.params.id)
      .populate("skill", "title")
      .populate("owner", "name")
      .populate("learner", "name");

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    if (
      contract.owner.toString() !== req.userId &&
      contract.learner.toString() !== req.userId
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(contract);
  } catch {
    res.status(500).json({ message: "Failed to load contract" });
  }
};

/* ================= REQUEST COMPLETION ================= */
// PATCH /api/contracts/:id/request-completion
export const requestCompletion = async (req, res) => {
  try {
    const contract = await SkillContract.findById(req.params.id);

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    if (
      contract.owner.toString() !== req.userId &&
      contract.learner.toString() !== req.userId
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (contract.status !== "active") {
      return res.status(400).json({ message: "Invalid contract state" });
    }

    contract.status = "completionRequested";
    contract.completionRequestedBy = req.userId;
    await contract.save();

    res.json(contract);
  } catch {
    res.status(500).json({ message: "Failed to request completion" });
  }
};

/* ================= COMPLETE CONTRACT ================= */
// PATCH /api/contracts/:id/complete
export const completeContract = async (req, res) => {
  try {
    const contract = await SkillContract.findById(req.params.id);

    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    if (
      contract.owner.toString() !== req.userId &&
      contract.learner.toString() !== req.userId
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (contract.status !== "completionRequested") {
      return res.status(400).json({
        message: "Completion not requested yet",
      });
    }

    if (contract.completionRequestedBy.toString() === req.userId) {
      return res.status(400).json({
        message: "Waiting for other party confirmation",
      });
    }

    contract.status = "completed";
    contract.completedAt = new Date();
    contract.completionRequestedBy = null;

    await contract.save();
    res.json(contract);
  } catch {
    res.status(500).json({ message: "Failed to complete contract" });
  }
};
