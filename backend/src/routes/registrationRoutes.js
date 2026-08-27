import express from 'express';
import { cancelRegistration, getAllRegistrationsForAdmin, getMyRegistrations, registerForEvent } from '../controllers/registrationController.js';
import { authorize, protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/event/:eventId', protect, authorize('student'), registerForEvent);
router.get('/my', protect, authorize('student'), getMyRegistrations);
router.put('/cancel/:id', protect, authorize('student'), cancelRegistration);
router.get('/admin/all', protect, authorize('admin'), getAllRegistrationsForAdmin);

export default router;
