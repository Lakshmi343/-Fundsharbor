const Investment = require('../models/Investment');
const Project = require('../models/Project');

// Investor contributes to a project
exports.investInProject = async (req, res) => {
  try {
    const { projectId, amount } = req.body;

    const project = await Project.findById(projectId);
    if (!project || project.status !== 'approved') {
      return res.status(404).json({ msg: 'Project not found or not approved' });
    }

    const investment = await Investment.create({
      project: projectId,
      investor: req.user.id,
      amount,
    });

    // Optionally update project’s funding progress here

    res.status(201).json({ msg: 'Investment successful', investment });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Investor's portfolio
exports.getMyInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({ investor: req.user.id }).populate('project');
    res.json(investments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all investments for a project (organizer or admin)
exports.getProjectInvestments = async (req, res) => {
  try {
    const { projectId } = req.params;
    const investments = await Investment.find({ project: projectId }).populate('investor', 'name email');
    res.json(investments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

