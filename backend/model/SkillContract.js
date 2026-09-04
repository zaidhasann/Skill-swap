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
      unique: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    learner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      enum: [
        "active",
        "completionRequested",
        "completed",
        "cancelled",
      ],
      default: "active",
    },

    completionRequestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    completedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("SkillContract", skillContractSchema);
