const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { USERTOJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const userSchema = mongoose.Schema(
  {
    isConnected: {
      type: Boolean,
    },
    lastConnection: {
      type: Date,
    },
    lastSocketId: {
      type: String,
    },
    browserInfo: [{ type: String }],
    status: {
      confirmed: { type: Boolean, default: false },
      blocked: { type: Boolean, default: false },
      available: { type: Boolean, default: true },
    },
    avatar: {
      type: String,
    },
    userName: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
    },
    birthdate: {
      type: Date,
    },
    email: {
      type: String,
      // unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      validate(value) {
        // if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        //   throw new Error('Password must contain at least one letter and one number');
        // }
        if (value.length <= 7) {
          throw new Error('Password must be at least 8 characters');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      required: true,
    },
    phoneNumber: {
      type: String,
      match: /^\d{8}$/,
    },
    address: {
      country: {
        type: String,
        default: 'Tunis',
      },
      governorates: {
        type: String,
      },
      subdivision: {
        type: String,
      },
      address: {
        type: String,
      },
      postalCode: {
        type: String,
        match: /^\d{4}$/,
      },
    },
    cin: {
      type: Number,
      match: /^\d{8}$/,
    },
    assured: {
      type: Boolean,
      default: false,
      //  required: true,
    },
    insurancePlan: {
      cnam: {
        num: {
          type: String,
        },
        dateValidation: {
          type: Date,
        },
        filliere: {
          type: String,
          enum: ['public', 'prive', 'remboursement'],
        },
      },
      other: {
        type: String,
      },
    },

    // notifications: [
    //   {
    //     title: {
    //       type: String,
    //     },
    //     text: {
    //       type: String,
    //     },
    //     type: {
    //       type: String,
    //     },
    //     url: {
    //       type: String,
    //     },
    //     isSticky: {
    //       type: Boolean,
    //       default: false,
    //     },
    //     isOpened: {
    //       type: Boolean,
    //       default: false,
    //     },
    //     createdAt: {
    //       type: Date,
    //       default: Date.now,
    //     },
    //   },
    // ],

    // for patient
    patientOffices: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Office',
        //  required: true,
      },
    ],
    patientAppointments: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Appointment',
      },
    ],
    patientConsultations: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Consultation',
      },
    ],

    // for doctor // secretaire
    office: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Office',
      //  required: true,
    },
    doctorsInteractions: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'DoctorsInteraction',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
// @walid review USERTOJSON
userSchema.plugin(USERTOJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */

// Schema virtual fields

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};
userSchema.statics.isUserNameTaken = async function (userName, excludeUserId) {
  const user = await this.findOne({ userName, _id: { $ne: excludeUserId } });
  return !!user;
};
/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
