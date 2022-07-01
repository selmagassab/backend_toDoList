// const publicFields = [];

const patienNotSelecteFields = ['lastSocketId', 'browserInfo', 'password', 'doctorsInteraction', 'comments'];

const previousConsultationNotSelecteFields = [
  'exam',
  'endDate',
  'Duration',
  'office',
  'appointment',
  'nextAppointmentType',
  'attachedDocument',
  'CAT',
];

const getDocumentSelectedFields = ['CAT', 'startDate', 'motif', 'id'];

const generateSelectFieldsObject = (array) => {
  const newObj = {};
  array.forEach((element) => {
    newObj[element] = 1;
  });
  return newObj;
};
const generateNotSelectFieldsObject = (array) => {
  const newObj = {};
  array.forEach((element) => {
    newObj[element] = 0;
  });
  return newObj;
};
module.exports = {
  generateSelectFieldsObject,
  generateNotSelectFieldsObject,
  patienNotSelecteFields,
  previousConsultationNotSelecteFields,
  getDocumentSelectedFields,
};
