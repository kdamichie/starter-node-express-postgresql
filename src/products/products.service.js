const knex = require("../db/connection");

function list() {
  return knex("products").select("*");
}

function read(productId) {
  return knex("products").select("*").where({ product_id: productId});
}

module.exports = {
  list,
  read,
}
