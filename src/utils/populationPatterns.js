const populateConclusions = [
  {
    path: 'patientConsultations',
    select: ['additionalConclusion'],
    options: {
      limit: 3,
    },
  },
];
// const populateAdressedBy = [
//   {
//     path: 'author',
//     select: ['userName', 'firstName', 'lastName', 'avatar'],
//   },
// ];
const populatePreviousConsultations = [
  {
    path: 'tags',
    select: ['title', 'description'],
  },
  {
    path: 'patient',
    select: ['firstName', 'lastName'],
  },
];
const populatePatientConsultation = [
  {
    path: 'patientConsultations',
    select: ['additionalConclusion', 'type', 'tags', 'startDate'],
    options: {
      limit: 3,
      sort: { startDate: -1 },
    },
    populate: {
      path: 'tags',
      select: ['title'],
      options: {
        limit: 3,
      },
    },
  },
  {
    path: 'patientAppointments',
    select: ['type', 'status'],
  },
];
const populatePatientAppointment = [
  {
    path: 'patient',
    select: ['firstName', 'lastName', 'userName'],
  },
  {
    path: 'tags',
    select: ['title', 'description'],
  },
];
const populatePatientFullAppointment = [
  {
    path: 'patient',
    select: ['firstName', 'lastName', 'userName', 'avatar', 'patientConsultations', 'phoneNumber', 'email', 'avatar'],
    populate: {
      path: 'patientConsultations',
      select: ['additionalConclusion', 'startDate', 'motif'],
    },
  },
  {
    path: 'tags',
    select: ['title', 'description'],
  },
];
const populateOfficeStaff = [
  {
    path: 'doctors',
    select: [
      'firstName',
      'lastName',
      'userName',
      'role',
      'phoneNumber',
      'email',
      'address',
      'isConnected',
      'lastConnection',
      'status',
    ],
  },
  {
    path: 'secretaries',
    select: [
      'firstName',
      'lastName',
      'userName',
      'role',
      'phoneNumber',
      'email',
      'address',
      'isConnected',
      'lastConnection',
      'status',
    ],
  },
];
const populateConvUsers = [
  {
    path: 'members',
    select: ['isConnected', 'lastSocketId', 'userName', 'firstName', 'lastName'],
  },
];
const populateConvMembers = [
  { path: 'members', select: ['firstName', 'lastName', 'userName', 'avatar', 'isConnected', 'role', 'status'] },
];

const populateDoctorInteraction = [
  {
    path: 'author',
    select: ['firstName', 'lastName', 'userName', 'avatar', 'isConnected', 'lastConnection', 'status'],
  },
  {
    path: 'views',
    select: ['firstName', 'lastName', 'userName', 'avatar'],
  },

  {
    path: 'tags',
    select: ['title', 'description'],
  },
  {
    path: 'cs',
    select: ['additionalConclusion'],
  },
];
const populateComments = [
  {
    path: 'author',
    select: ['firstName', 'lastName', 'userName', 'avatar', 'isConnected', 'lastConnection', 'status'],
  },
  {
    path: 'doctorsInteraction',
    select: ['title'],
  },
];

const populateAllDoctorInteraction = [
  {
    path: 'comments',
    select: ['content', 'createdAt', 'updatedAt', 'author'],
    populate: {
      path: 'author',
      select: ['userName', 'firstName', 'lastName', 'avatar'],
    },
  },
  {
    path: 'author',
    select: ['firstName', 'lastName', 'userName', 'avatar', 'isConnected', 'lastConnection', 'status'],
  },
  {
    path: 'views',
    select: ['firstName', 'lastName', 'userName', 'avatar'],
  },
  {
    path: 'tags',
    select: ['title', 'description'],
  },
  {
    path: 'upvotes',
    select: ['firstName', 'lastName', 'avatar'],
  },
  {
    path: 'downvotes',
    select: ['firstName', 'lastName', 'avatar'],
  },
  {
    path: 'answers',
    select: ['content', 'createdAt', 'updatedAt', 'author', 'comments', 'upvotes', 'downvotes'],
    populate: [
      {
        path: 'author',
        select: ['userName', 'firstName', 'lastName', 'avatar'],
      },
      {
        path: 'comments',
        select: ['content', 'createdAt', 'updatedAt', 'author'],
        populate: {
          path: 'author',
          select: ['userName', 'firstName', 'lastName', 'avatar'],
        },
      },
      {
        path: 'upvotes',
        select: ['firstName', 'lastName', 'avatar'],
      },
      {
        path: 'downvotes',
        select: ['firstName', 'lastName', 'avatar'],
      },
    ],
  },
];

module.exports = {
  populateConclusions,
  populatePatientConsultation,
  populateOfficeStaff,
  populatePatientAppointment,
  populatePatientFullAppointment,
  populatePreviousConsultations,
  populateConvUsers,
  populateConvMembers,
  populateDoctorInteraction,
  populateAllDoctorInteraction,
  populateComments,
};
