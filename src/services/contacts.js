import ContactsCollection from "../db/models/Contacts.js";

export const getContacts = () => ContactsCollection.find();

export const getContactById = id => ContactsCollection.findById(id);

export const postContacts = (payload) => ContactsCollection.create(payload);

export const patchContacts = async (contactId, payload, options = {}) => {
 const result = await ContactsCollection.findOneAndUpdate({ _id: contactId }, payload, {
    new: true, includeResultMetadata: true,
    ...options
 });

  if (!result || !result.value) return null;
  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted)
  };
};
export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });
  return contact;
 };

