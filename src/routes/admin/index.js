/**
 * Created by Henry Huang.
 */
import express from 'express';
import eventsRouter from './events';
import configurationsRouter from './configurations';

const router = express.Router();

router.use('/events', eventsRouter);
router.use('/configurations', configurationsRouter);

export default router;
