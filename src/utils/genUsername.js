/**
 * Generate a username using the given first and last names
 * @param {String} fName
 * @param {string} lName
 * @returns {String}
 */
const genUsername = (fName, lName) => {
  return `${fName}-${lName}-${Math.floor(Math.random() * 100)}`;
};

module.exports = genUsername;
