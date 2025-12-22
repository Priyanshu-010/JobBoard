import Job from "../models/jobSchema.js";

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).sort({createdAt: -1});
    res.status(200).json(jobs)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error - Cannot get Jobs" });
    console.log("Error in getJobs controller", error);
  }
};
export const getSingleJob = async (req, res) => {
  try {
    const {id} = req.params;
    const job = await Job.findById(id)
    res.status(200).json(job)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error - Cannot get Jobs" });
    console.log("Error in getJobs controller", error);
  }
};

export const createJob = async(req, res) =>{
  try {
    
  } catch (error) {
    
  }
}
