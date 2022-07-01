/* eslint-disable no-restricted-syntax */
const multiparty = require('multiparty');
const request = require('request');
const fs = require('fs');
const { uploaderHost } = require('./hostdetection');

const promisifyUpload = (req) =>
  new Promise((resolve, reject) => {
    const form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
      if (err) return reject(err);
      return resolve([fields, files]);
    });
  });

const uploadArrayOfFiles = async (list) => {
  return new Promise((resolve, reject) => {
    let files = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const element of list) {
      files = files.concat({
        // eslint-disable-next-line security/detect-non-literal-fs-filename
        value: fs.createReadStream(element.path),
        options: {
          filename: element.originalFilename,
        },
      });
    }

    const formData = {
      file: files,
    };

    const postUrl = `${uploaderHost}/upload`;

    request.post(
      {
        url: postUrl,
        formData,
      },
      function (err, httpResponse, body) {
        if (err) {
          for (const element of list) {
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            fs.unlink(element.path, (errr) => {
              if (errr) {
                throw errr;
              }
            });
          }
          reject(err);
        }
        if (!body) {
          for (const element of list) {
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            fs.unlink(element.path, (errors) => {
              if (errors) {
                throw errors;
              }
            });
          }
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('uploader erreur');
        }
        for (const element of list) {
          // eslint-disable-next-line security/detect-non-literal-fs-filename
          fs.unlink(element.path, (errors) => {
            if (errors) {
              throw errors;
            }
          });
        }
        resolve(JSON.parse(body));
      }
    );
  });
};
module.exports = {
  promisifyUpload,
  uploadArrayOfFiles,
};
