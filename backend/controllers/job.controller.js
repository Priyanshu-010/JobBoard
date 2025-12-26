import Job from "../models/jobSchema.js";

// Public
export const getJobs = async (req, res) => {
  try {
    const userId = req.user?._id;
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    const jobsWithAppliedFlag = jobs.map((job) => {
      const hasApplied = userId
        ? job.applications.some(
            (app) => app.user.toString() === userId.toString()
          )
        : false;

      return {
        ...job.toObject(),
        hasApplied,
      };
    });

    res.status(200).json(jobsWithAppliedFlag);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error - Cannot get Jobs" });
    console.log("Error in getJobs controller", error);
  }
};
export const getSingleJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;
    const job = await Job.findById(id);
     if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const hasApplied = userId
      ? job.applications.some(
          (app) => app.user.toString() === userId.toString()
        )
      : false;

    res.status(200).json({
      ...job.toObject(),
      hasApplied,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error - Cannot get Jobs" });
    console.log("Error in getJobs controller", error);
  }
};

// Admin
export const createJob = async (req, res) => {
  const { company, role, description } = req.body;
  try {
    const job = await Job.create({ company, role, description });
    res.status(201).json(job);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error - Cannot create Jobs" });
    console.log("Error in createJOb controller", error);
  }
};
export const updateJob = async (req, res) => {
  const { company, role, description } = req.body;
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(400).json({ message: "Job does not exists" });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { company, role, description },
      { new: true }
    );

    res.status(200).json(updatedJob);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error - Cannot update Job" });
    console.log("Error in updateJob controller", error);
  }
};
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(400).json({ message: "Job does not exists" });
    }

    await Job.findByIdAndDelete(id);
    res.status(200).json({ message: "Job Deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error - Cannot delete Job" });
    console.log("Error in deleteJob controller", error);
  }
};

//User
export const applyToJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(400).json({ message: "Job does not exists" });
    }
    const alreadyApplied = job.applications.some(
      (app) => app.user.toString() === userId
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    job.applications.push({ user: userId });

    await job.save();
    res.status(200).json({ message: "Applied successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error - Cannot Apply to Job" });
    console.log("Error in applyToJob controller", error);
  }
};

// Admin - Updating Application Status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const job = await Job.findById(id);

    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    if (!job) {
      return res.status(400).json({ message: "Job not found" });
    }
    const application = job.applications.find(
      (app) => app.user.toString() === userId
    );

    if (!application) {
      return res.status(400).json({ message: "Application not found" });
    }

    application.status = status;
    await job.save();

    res.status(200).json({ message: `Application ${status}` });
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          "Internal Server Error - Cannot update application status of the Job",
      });
    console.log("Error in updateApplicationStatus controller", error);
  }
};
