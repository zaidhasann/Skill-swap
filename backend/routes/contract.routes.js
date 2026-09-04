import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getMyContracts,
  getContractById,
  requestCompletion,
  completeContract,
} from "../controllers/contract.controller.js";

const router = express.Router();

router.get("/my", protect, getMyContracts);
router.get("/:id", protect, getContractById);
router.patch("/:id/request-completion", protect, requestCompletion);
router.patch("/:id/complete", protect, completeContract);

export default router;
