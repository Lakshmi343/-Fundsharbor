

const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const restrictTo = require('../middleware/roleMiddleware');
const {
  submitRequest,
  getRequests,
  handleRequest
} = require('../controllers/organizerController');


router.post('/request', protect, submitRequest);


router.get('/requests', protect, restrictTo('admin'), getRequests);
router.post('/requests/:id/handle', protect, restrictTo('admin'), handleRequest);

module.exports = router;
