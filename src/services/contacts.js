import ContactsCollection from "../db/models/Contacts.js";

export const getContacts = () => ContactsCollection.find();

export const getContactById = id => ContactsCollection.findById(id);

export const postContacts = (payload) => ContactsCollection.create(payload);

export const patchContacts = (contactId, payload) => ContactsCollection.findOneAndUpdate({ _id: contactId }, payload, { new: true });

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });
  return contact;
 };

