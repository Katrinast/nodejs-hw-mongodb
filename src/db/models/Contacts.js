import { Schema, model } from "mongoose";
import { contactsList } from "../../constants/contacts.js";


const contactsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: false,
  },
  isFavourite: {
    type: Boolean,
    default: false,
  },
  contactType: {
    type: String,
    enum: contactsList,
    required: true,
    default: 'personal',
  },
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
},

  {
    timestamps: true,
    versionKey: false,
});

const ContactsCollection = model("contacts", contactsSchema);

export default ContactsCollection;
