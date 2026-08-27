import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

export const registerForEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    const existingRegistration = await Registration.findOne({
      event: eventId,
      student: req.user._id,
      status: 'registered',
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'You are already registered for this event.' });
    }

    const totalRegistered = await Registration.countDocuments({
      event: eventId,
      status: 'registered',
    });

    if (totalRegistered >= event.maxParticipants) {
      return res.status(400).json({ message: 'This event is already full.' });
    }

    const registration = await Registration.create({
      event: eventId,
      student: req.user._id,
      status: 'registered',
    });

    res.status(201).json({ message: 'Registration successful', registration });
  } catch (error) {
    next(error);
  }
};

export const cancelRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.findOne({
      _id: req.params.id,
      student: req.user._id,
    });

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found.' });
    }

    registration.status = 'cancelled';
    await registration.save();

    res.json({ message: 'Registration cancelled successfully' });
  } catch (error) {
    next(error);
  }
};

export const getMyRegistrations = async (req, res, next) => {
  try {
    const registrations = await Registration.find({
      student: req.user._id,
      status: 'registered',
    })
      .populate({
        path: 'event',
        select: 'title description date venue category startTime endTime maxParticipants',
      })
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    next(error);
  }
};

export const getAllRegistrationsForAdmin = async (req, res, next) => {
  try {
    const registrations = await Registration.find({ status: 'registered' })
      .populate('student', 'name email studentId')
      .populate('event', 'title date venue')
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    next(error);
  }
};
