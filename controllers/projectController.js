

const Project = require('../models/Project');


exports.createProject = async (req, res) => {
  try {
    const { title, description, fundingGoal } = req.body;

    const newProject = await Project.create({
      title,
      description,
      fundingGoal,
      creator: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: newProject,
    });
  } catch (err) {
    console.error('Error creating project:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('creator', 'name');
    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (err) {
    console.error('Error fetching projects:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('creator', 'name');

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    return res.status(200).json({ success: true, data: project });
  } catch (err) {
    console.error('Error fetching project:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (project.creator.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    const { title, description, fundingGoal } = req.body;

    project.title = title || project.title;
    project.description = description || project.description;
    project.fundingGoal = fundingGoal || project.fundingGoal;

    await project.save();

    res.status(200).json({ success: true, data: project });
  } catch (err) {
    console.error('Error updating project:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
