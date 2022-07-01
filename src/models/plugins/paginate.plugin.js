/* eslint-disable no-param-reassign */

const { isEmpty } = require('lodash');

const paginate = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - Mongo filter
   * @param {Object} [options] - Query options
   * @param {string} [options.sortBy] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
   * @param {number} [options.limit] - Maximum number of results per page (default = 10)
   * @param {number} [options.page] - Current page (default = 1)
   * @returns {Promise<QueryResult>}
   */
  schema.statics.paginate = async function (filter, options, select, populateArray = []) {
    let sort = '';
    const sortByOption = isEmpty(options.sortBy) ? 'createdAt:desc' : options.sortBy;

    if (sortByOption) {
      const sortingCriteria = [];
      sortByOption.split(',').forEach((sortOption) => {
        const [key, order] = sortOption.split(':');
        sortingCriteria.push((order === 'desc' ? '-' : '') + key);
      });
      sort = sortingCriteria.join(' ');
    } else {
      sort = 'createdAt';
    }

    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;

    // const tt = { $or: [{ brand: { $regex: 'hyunda', $options: 'i' } }, { model: { $regex: 'Ato', $options: 'i' } }] };
    const countPromise = this.countDocuments(filter).exec();
    // const docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit).select(select).populate(populateObj).exec();

    //  const ttt =
    const docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit).select(select);
    // .populate(populateArray);
    // .populate({ path: 'exam',select:["carPublication","examDate"] });
    // '', []
    // docsPromise;
    populateArray.forEach((el) => {
      docsPromise.populate(el);
    });
    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };
      return Promise.resolve(result);
    });
  };
};

module.exports = paginate;
