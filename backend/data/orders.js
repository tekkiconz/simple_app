/**
 * @typedef {Object} OrderItem
 * @property {number} productId
 * @property {number} quantity
 */

/**
 * @typedef {Object} Order
 * @property {number} orderId
 * @property {Array<OrderItem>} orderItems
 */

/**
 * @type {Array<Order>}
 */
const orders = [];

module.exports = { orders };
