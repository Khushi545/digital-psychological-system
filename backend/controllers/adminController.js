const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Screening = require('../models/Screening');
const Post = require('../models/Post');

// @desc    Get dashboard metrics
// @route   GET /api/admin/metrics
// @access  Private (Admin)
exports.getMetrics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const totalScreenings = await Screening.countDocuments();
    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalAppointments,
        totalScreenings,
        totalPosts
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get alerts (e.g., severe screenings)
// @route   GET /api/admin/alerts
// @access  Private (Admin, Counsellor)
exports.getAlerts = async (req, res) => {
  try {
    // Find screenings that are severe to flag for review
    const severeScreenings = await Screening.find({ severity: 'Severe' })
      .populate('user', 'name email isAnonymous anonymousId')
      .sort('-createdAt')
      .limit(20);

    res.status(200).json({
      success: true,
      count: severeScreenings.length,
      data: severeScreenings
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
