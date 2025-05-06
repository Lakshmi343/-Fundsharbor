
const Project = require('../models/Project');

// Create new project (Organizer only)
exports.createProject = async (req, res) => {
  try {
    const { title, description, fundingGoal } = req.body;

    const newProject = await Project.create({
      title,
      description,
      fundingGoal,
      creator: req.user.id,
    });

    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all approved projects (for browsing)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: 'approved' }).populate('creator', 'name');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('creator', 'name');
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update a project (Organizer only)
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) return res.status(404).json({ msg: 'Project not found' });
    if (project.creator.toString() !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });

    const { title, description, fundingGoal } = req.body;

    project.title = title || project.title;
    project.description = description || project.description;
    project.fundingGoal = fundingGoal || project.fundingGoal;

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
