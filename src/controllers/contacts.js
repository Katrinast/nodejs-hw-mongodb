import createHttpError from "http-errors";
import { getContacts, getContactById, postContacts, patchContacts, deleteContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";

import { parseSortParams } from "../utils/parseSortParams.js";

import { parseFilterParams } from "../utils/parseFilterParams.js";

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const { _id: userId } = req.user;



  const contacts = await getContacts({page, perPage, sortBy, sortOrder, filter: {...filter, userId}});

  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: contacts,
  });
};


export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const { _id: userId } = req.user;

  const contact = await getContactById({ _id: contactId, userId });

  if (!contact) throw createHttpError(404, 'Contact not found');

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const postContactsController = async (req, res) => {
   const { _id: userId } = req.user;

  const contact = await postContacts({...req.body, userId});

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: contact,
  });
};

export const patchContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const payload = req.body;
  const { _id: userId } = req.user;

  const data = await patchContacts( contactId, userId ,
    payload,);

   if (!data) throw createHttpError(404, 'Contact not found');

  res.status(200).json({
    status: 200,
    message: "Successfully patched a contact!",
    data: data.contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId} = req.params;
  const { _id: userId } = req.user._id;


  const contact = await deleteContact({ contactId, userId });

  if (!contact) throw createHttpError(404, 'Contact not found');


  res.status(204).send();

 };


