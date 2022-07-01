/**
 * Create an object composed of the picked object properties
 * @param {Object} attr
 * @param {[]} dataArray
 * @returns {[{Object}]}
 */

const nestedPick = (dataArray, attr) => {
  if (dataArray.length > 0) {
    const data = dataArray.map((obj) => {
      return obj[attr];
    });
    const extractedData = data.reduce(function (a, b) {
      return a.concat(b);
    });
    return extractedData;
  }
  return [];
};

module.exports = nestedPick;
