import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  sendRequest,
  getMyRequests,
  getSentRequests,
  updateRequestStatus,
  getRequestById,
} from "../controllers/request.controller.js";

const router = express.Router();

router.post("/", protect, sendRequest);
router.get("/my", protect, getMyRequests);       // owner
router.get("/sent", protect, getSentRequests);  // requester
router.get("/:id", protect, getRequestById);    // chat access
router.patch("/:id", protect, updateRequestStatus);

export default router;
