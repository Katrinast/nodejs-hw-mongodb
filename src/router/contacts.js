import { Router } from 'express';

import { getContactsController, getContactByIdController, postContactsController, patchContactByIdController, deleteContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post('/', ctrlWrapper(postContactsController));
router.patch('/:contactId', ctrlWrapper(patchContactByIdController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
