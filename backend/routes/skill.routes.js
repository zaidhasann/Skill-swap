import express from "express";
import {
  postSkill,
  getSkills,
  getMySkills,
  deleteSkill,
} from "../controllers/skill.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getSkills);
router.get("/my", protect, getMySkills);
router.post("/", protect, postSkill);
router.delete("/:id", protect, deleteSkill);

export default router;
