import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User", // admin
    //   required: true,
    // },
    applications: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
          enum: ["applied", "accepted", "rejected"],
          default: "applied",
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("job", jobSchema)
export default Job;