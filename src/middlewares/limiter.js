const rateLimit = require('express-rate-limit');

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message: 'Too many accounts created from this IP, please try again after an hour',
});

const createRequestForExamLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message: 'Too many accounts created from this IP, please try again after an hour',
});
const requestVerifEmailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message: 'Too many accounts created from this IP, please try again after an hour',
});

module.exports = { createAccountLimiter, createRequestForExamLimiter, requestVerifEmailLimiter };
