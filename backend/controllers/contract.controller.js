import SkillContract from "../model/SkillContract.js";

export const getMyContracts = async (req, res) => {
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
};

export const completeContract = async (req, res) => {
  const contract = await SkillContract.findById(req.params.id);

  if (!contract) {
    return res.status(404).json({ message: "Contract not found" });
  }

  // Only participants can complete
  if (
    contract.owner.toString() !== req.userId.toString() &&
    contract.learner.toString() !== req.userId.toString()
  ) {
    return res.status(403).json({ message: "Not authorized" });
  }

  contract.status = "completed";
  contract.completedAt = new Date();
  await contract.save();

  res.json(contract);
};
