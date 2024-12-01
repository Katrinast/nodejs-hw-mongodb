

import { SORT_ORDER } from "../constants/contacts.js";
import ContactsCollection from "../db/models/Contacts.js";

import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getContacts = async ({page = 1, perPage = 10, sortBy = '_id', sortOrder = SORT_ORDER.ASC, filter = {},}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactQuery = ContactsCollection.find();

  if (filter.isFavourite) {
    contactQuery.where("isFavourite").equals(filter.isFavourite);
  };

  if (filter.contactType) {
    contactQuery.where("contactType").equals(filter.contactType);
  };

  if (filter.userId) {
    contactQuery.where("userId").equals(filter.userId);
  }


  const contactsCount = await ContactsCollection.find().merge(contactQuery).countDocuments();

  const contacts = await contactQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder}).exec();

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };

};

export const getContactById = async (filter) => {
  const contact = await ContactsCollection.findOne(filter);

  return contact;
};

export const postContacts = (payload) => ContactsCollection.create(payload);

export const patchContacts = async (contactId, userId, payload, options = {}) => {
 const result = await ContactsCollection.findOneAndUpdate({ _id: contactId, userId, }, payload, {
    new: true, includeResultMetadata: true,
    ...options
 });

  if (!result || !result.value) return null;
  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted)
  };
};

export const deleteContact = async (contactId, userId) => {
  console.log(contactId, userId);
  const contact = await ContactsCollection.findOneAndDelete( {_id: contactId, userId});
  return contact;
 };

