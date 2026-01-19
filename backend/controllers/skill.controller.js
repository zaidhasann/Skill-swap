import Skill from "../model/Skill.js";

// POST /api/skills
export const postSkill = async (req, res) => {
  const skill = await Skill.create({
    ...req.body,
    owner: req.userId,
  });

  res.status(201).json(skill);
};

// GET /api/skills?search=
export const getSkills = async (req, res) => {
  const search = req.query.search || "";

  const skills = await Skill.find({
    $or: [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ],
  }).populate("owner", "name");

  res.json(skills);
};

// GET /api/skills/my
export const getMySkills = async (req, res) => {
  const skills = await Skill.find({ owner: req.userId });
  res.json(skills);
};

// ✅ DELETE /api/skills/:id
export const deleteSkill = async (req, res) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({ message: "Skill not found" });
  }

  // ensure only owner can delete
  if (skill.owner.toString() !== req.userId) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await skill.deleteOne();
  res.json({ message: "Skill deleted successfully" });
};
