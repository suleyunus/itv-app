const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');

const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single('avatar');

const dUri = new Datauri();

// eslint-disable-next-line max-len
const dataUri = (avatar) => dUri.format(path.extname(avatar.originalname).toString(), avatar.buffer).content;

module.exports = {
  multerUploads,
  dataUri,
};
