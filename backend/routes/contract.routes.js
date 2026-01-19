import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getMyContracts,
  completeContract,
} from "../controllers/contract.controller.js";

const router = express.Router();

router.get("/my", protect, getMyContracts);
router.patch("/:id/complete", protect, completeContract);

export default router;
