const Job = require("../models/Job");

// CREATE JOB
exports.createJob = async (req, res) => {
  try {
    const { company, role, status } = req.body;

    const job = await Job.create({
      user: req.user, // JWT middleware se aaya
      company,
      role,
      status,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL JOBS
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE JOB
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE JOB
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
