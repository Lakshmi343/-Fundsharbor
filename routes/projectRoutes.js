
const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
} = require('../controllers/projectController');

// Public routes
router.get('/', getProjects);           // Browse all approved projects
router.get('/:id', getProjectById);     // View specific project

// Protected (Organizer) routes
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);

module.exports = router;
