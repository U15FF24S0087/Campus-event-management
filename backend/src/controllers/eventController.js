import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

export const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create({
      ...req.body,
      organizer: req.user._id,
    });

    res.status(201).json({
      message: 'Event created successfully',
      event,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllEvents = async (req, res, next) => {
  try {
    const { search, category, status } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { venue: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) filter.category = category;
    if (status) filter.status = status;

    const events = await Event.find(filter)
      .populate('organizer', 'name email')
      .sort({ date: 1 });

    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name email');

    if (!event) return res.status(404).json({ message: 'Event not found.' });

    const registrationCount = await Registration.countDocuments({ event: event._id, status: 'registered' });

    res.json({
      ...event.toObject(),
      registrationCount,
      availableSeats: Math.max(event.maxParticipants - registrationCount, 0),
    });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: 'Event not found.' });

    if (String(event.organizer) !== String(req.user._id)) {
      return res.status(403).json({ message: 'You can only update your own event.' });
    }

    Object.assign(event, req.body);
    await event.save();

    res.json({ message: 'Event updated successfully', event });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: 'Event not found.' });

    if (String(event.organizer) !== String(req.user._id)) {
      return res.status(403).json({ message: 'You can only delete your own event.' });
    }

    await Registration.deleteMany({ event: event._id });
    await event.deleteOne();

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getAdminEventStats = async (req, res, next) => {
  try {
    const stats = await Registration.aggregate([
      { $match: { status: 'registered' } },
      {
        $group: {
          _id: '$event',
          count: { $sum: 1 },
        },
      },
    ]);

    const eventStats = await Event.find({ organizer: req.user._id }).select('_id title');

    const statsMap = new Map();
    stats.forEach((item) => statsMap.set(String(item._id), item.count));

    const response = eventStats.map((event) => ({
      eventId: event._id,
      title: event.title,
      registrations: statsMap.get(String(event._id)) || 0,
    }));

    res.json({ totalEvents: eventStats.length, stats: response });
  } catch (error) {
    next(error);
  }
};
