import { Router } from 'express';

import { getContactsController, getContactByIdController, postContactsController, patchContactByIdController, deleteContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import { createContactsSchema, updateContactSchema } from '../validation/contacts.js';
import { isValiId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', isValiId, ctrlWrapper(getContactByIdController));
router.post('/', validateBody(createContactsSchema), ctrlWrapper(postContactsController));
router.patch('/:contactId', isValiId, validateBody(updateContactSchema), ctrlWrapper(patchContactByIdController));
router.delete('/:contactId', isValiId, ctrlWrapper(deleteContactController));

export default router;
