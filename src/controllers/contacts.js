import createHttpError from "http-errors";
import { getContacts, getContactById, postContacts, patchContacts, deleteContact } from "../services/contacts.js";

export const getContactsController = async (req, res) => {
  const contacts = await getContacts();

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


