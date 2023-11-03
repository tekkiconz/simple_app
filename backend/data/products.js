/**
 * @typedef {Object} ProductObject
 * @property {number} id Unique id of that product. Should be equal to the current index of which product + 1
 * @property {string} name
 * @property {Number} price
 */

/**
 * @description For quick query purposes
 * @type {Object<string, ProductObject>}
 */
const productById = {};

module.exports = {
  productById,
};
