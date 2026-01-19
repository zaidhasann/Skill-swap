import mongoose from "mongoose";

const skillContractSchema = new mongoose.Schema(
  {
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SkillRequest",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // skill owner
      required: true,
    },
    learner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // requester
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    durationDays: {
      type: Number,
      default: 7,
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
    completedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("SkillContract", skillContractSchema);
