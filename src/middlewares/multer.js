import multer from 'multer';

import { TEMP_UPLOAD_DIR } from '../constants/contacts.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
    const filename = `${uniqueSuffix}_${file.originalname}`;
    cb(null, filename);
  },
});

export const upload = multer({ storage, });
