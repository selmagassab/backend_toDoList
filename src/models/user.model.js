const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { USERTOJSON, paginate } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
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
