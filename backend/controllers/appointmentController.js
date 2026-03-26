const Appointment = require('../models/Appointment');
const User = require('../models/User');

// @desc    Create appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = async (req, res) => {
  try {
    const { counsellorId, date, timeSlot, notes } = req.body;

    // Verify counsellor exists
    const counsellor = await User.findOne({ _id: counsellorId, role: 'counsellor' });
    if (!counsellor) {
      return res.status(404).json({ success: false, error: 'Counsellor not found' });
    }

    const appointment = await Appointment.create({
      student: req.user.id,
      counsellor: counsellorId,
      date,
      timeSlot,
      notes
    });

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get user appointments
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res) => {
  try {
    let query;

    if (req.user.role === 'counsellor') {
      query = { counsellor: req.user.id };
    } else if (req.user.role === 'admin') {
      query = {}; // admin sees all
    } else {
      query = { student: req.user.id };
    }

    const appointments = await Appointment.find(query).populate({
      path: 'counsellor student',
      select: 'name email role'
    }).sort('date');

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id/status
// @access  Private (Counsellor, Admin)
exports.updateStatus = async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }

    // Ensure user is the assigned counsellor or admin
    if (appointment.counsellor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Not authorized' });
    }

    appointment = await Appointment.findByIdAndUpdate(req.params.id, { 
      status: req.body.status,
      meetingLink: req.body.meetingLink 
    }, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
