const Moment = require('moment-timezone');
const { extendMoment } = require('moment-range');

const moment = extendMoment(Moment);

// moment.tz.setDefault('Europe/Paris')

module.exports = moment;
