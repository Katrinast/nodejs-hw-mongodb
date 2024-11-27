import { Router } from 'express';

import { getContactsController, getContactByIdController, postContactsController, patchContactByIdController, deleteContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import { createContactsSchema, updateContactSchema } from '../validation/contacts.js';
import { isValiId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);
contactsRouter.get('/', ctrlWrapper(getContactsController));
contactsRouter.get('/:contactId', isValiId, ctrlWrapper(getContactByIdController));
contactsRouter.post('/', validateBody(createContactsSchema), ctrlWrapper(postContactsController));
contactsRouter.patch('/:contactId', isValiId, validateBody(updateContactSchema), ctrlWrapper(patchContactByIdController));
contactsRouter.delete('/:contactId', isValiId, ctrlWrapper(deleteContactController));

export default contactsRouter;
