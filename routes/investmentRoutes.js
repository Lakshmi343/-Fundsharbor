
const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const restrictTo = require('../middleware/roleMiddleware');
const {
  investInProject,
  getMyInvestments,
  getProjectInvestments
} = require('../controllers/investmentController');

// Investor contributes
router.post('/', protect, restrictTo('investor'), investInProject);

// Investor views their investments
router.get('/my', protect, restrictTo('investor'), getMyInvestments);

// Organizer/Admin views project funding
router.get('/project/:projectId', protect, getProjectInvestments);

module.exports = router;
