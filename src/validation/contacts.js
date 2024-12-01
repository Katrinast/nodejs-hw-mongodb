import Joi from 'joi';
import { contactsList } from '../constants/contacts.js';

export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.number().integer().required(),
  email: Joi.string().email().min(3).max(20).required(),
  isFavourite: Joi.boolean().default(false),
contactType: Joi.string().min(3).max(20).valid(...contactsList).default('personal'),
});

export const updateContactSchema = Joi.object({
name: Joi.string().min(3).max(20),
  phoneNumber: Joi.number().integer(),
  email: Joi.string().email().min(3).max(20),
  isFavourite: Joi.boolean(),
contactType: Joi.string().min(3).max(20).valid(...contactsList).default('personal'),
});
