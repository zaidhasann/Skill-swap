import mongoose from "mongoose";

const skillRequestSchema = new mongoose.Schema(
  {
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },

    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

/* ================= INDEXES ================= */

// 🔒 Prevent duplicate PENDING requests
skillRequestSchema.index(
  { skill: 1, requester: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "pending" },
  }
);

// ⚡ Incoming requests
skillRequestSchema.index({ owner: 1, status: 1 });

// ⚡ Sent requests
skillRequestSchema.index({ requester: 1 });

// ⚡ Atomic update + status
skillRequestSchema.index({ _id: 1, status: 1 });

// ⚡ Chat authorization optimization (optional but recommended)
skillRequestSchema.index({
  _id: 1,
  owner: 1,
  requester: 1,
  status: 1,
});

export default mongoose.model("SkillRequest", skillRequestSchema);
