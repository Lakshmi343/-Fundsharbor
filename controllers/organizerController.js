
const OrganizerRequest = require('../models/OrganizerRequest');
const User = require('../models/User');

// User submits a request to become organizer
exports.submitRequest = async (req, res) => {
  try {
    const existing = await OrganizerRequest.findOne({ user: req.user.id, status: 'pending' });
    if (existing) return res.status(400).json({ msg: 'You already have a pending request' });

    const request = await OrganizerRequest.create({
      user: req.user.id,
      projectIdea: req.body.projectIdea,
    });

    res.status(201).json({ msg: 'Request submitted', request });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Admin fetches all requests
exports.getRequests = async (req, res) => {
  try {
    const requests = await OrganizerRequest.find().populate('user', 'name email role');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Admin approves/rejects a request
exports.handleRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // 'approve' or 'reject'

    const request = await OrganizerRequest.findById(id);
    if (!request) return res.status(404).json({ msg: 'Request not found' });

    request.status = action === 'approve' ? 'approved' : 'rejected';
    await request.save();

    if (action === 'approve') {
      await User.findByIdAndUpdate(request.user, { role: 'organizer' });
    }

    res.json({ msg: `Request ${action}d`, request });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
