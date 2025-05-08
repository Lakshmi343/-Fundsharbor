
const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
} = require('../controllers/projectController');

router.get('/', getProjects);           
router.get('/:id', getProjectById);     


router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);

module.exports = router;

