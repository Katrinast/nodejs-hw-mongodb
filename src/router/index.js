import { Router } from 'express';
import authRouter from '../router/auth.js';
import contactsRouter from '../router/contacts.js';



const router = Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

export default router;
