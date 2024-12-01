import createHttpError from "http-errors";
import { getContacts, getContactById, postContacts, patchContacts, deleteContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

import { parseSortParams } from "../utils/parseSortParams.js";

import { parseFilterParams } from "../utils/parseFilterParams.js";

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortOrder, sortBy } = parseSortParams(req.query);

  const filter = parseFilterParams(req.query);

  const contacts = await getContacts({page, perPage, sortBy, sortOrder, filter});

  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: contacts,
  });
};


export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) throw createHttpError(404, 'Contact not found');

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const postContactsController = async (req, res) => {
  console.log(req.body);

  const contact = await postContacts(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: contact,
  });
};

export const patchContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const data = await patchContacts(contactId, req.body);

   if (!data) throw createHttpError(404, 'Contact not found');

  res.status(200).json({
    status: 200,
    message: "Successfully patched a contact!",
    data: data.contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) throw createHttpError(404, 'Contact not found');


  res.status(204).send();

 };


