const crypto = require('crypto');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const config = require('../config/config');

const storage = new GridFsStorage({
  url: config.mongoose.url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        // file extension controle
        /*  const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.mp4' && ext !== '.pdf') {
          return reject(new Error('Only images and zip are allowed'));
        } */
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|pdf|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
    // eslint-disable-next-line no-else-return
  }
  cb(new Error('Only images and pdf are allowed'));
}
const upload = multer({
  storage,
  limits: {
    fieldNameSize: 50,
    fieldSize: 20000,
    fileSize: 5242880,
  },
  // eslint-disable-next-line object-shorthand
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
