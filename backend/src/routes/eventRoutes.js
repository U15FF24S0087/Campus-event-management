import express from 'express';
import { body } from 'express-validator';
import { createEvent, deleteEvent, getAdminEventStats, getAllEvents, getEventById, updateEvent } from '../controllers/eventController.js';
import { authorize, protect } from '../middleware/auth.js';
import validateRequest from '../middleware/validateRequest.js';

const router = express.Router();

router.get('/', getAllEvents);
router.get('/stats', protect, authorize('admin'), getAdminEventStats);
router.get('/:id', getEventById);

router.post(
  '/',
  protect,
  authorize('admin'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('venue').notEmpty().withMessage('Venue is required'),
    body('date').notEmpty().withMessage('Date is required'),
    body('startTime').notEmpty().withMessage('Start time is required'),
    body('endTime').notEmpty().withMessage('End time is required'),
    body('maxParticipants').isInt({ min: 1 }).withMessage('Max participants must be a positive number'),
    validateRequest,
  ],
  createEvent
);

router.put(
  '/:id',
  protect,
  authorize('admin'),
  [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().notEmpty().withMessage('Description cannot be empty'),
    body('maxParticipants').optional().isInt({ min: 1 }).withMessage('Max participants must be a positive number'),
    validateRequest,
  ],
  updateEvent
);

router.delete('/:id', protect, authorize('admin'), deleteEvent);

export default router;
