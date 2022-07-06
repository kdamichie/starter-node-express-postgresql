const productsService = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function productExists(req, res, next) {
const product = await productsService.read(req.params.productId);
if (product) {
  res.locals.product = product;
  return next();
}
next({ status: 404, message: `Product cannot be found.` });
}

// function productExists(req, res, next) {
//   productsService
//   .read(req.params.productId)
//   .then((product) => {
//     if (product) {
//       res.locals.product = product;
//       return next();
//     }
//     next({ status: 404, message: `Product cannot be found.` });
//   })
//   .catch(next);
// }

async function listOutOfStockCount(req, res) {
  res.json({ data: await productsService.listOutOfStock() });
}

async function listPriceSummary(req, res) {
  res.json({ data: await productsService.listPriceSummary() });
}

async function listTotalWeightByProduct(req, res) {
  res.json({ data: await productsService.listTotalWeightByProduct() });
}

function read(req, res) {
  const { product: data } = res.locals;
  res.json({ data });
}

async function list(req, res) {
  const data = await productsService.list();
  res.json({ data });
}

// function list(req, res, next) {
//   productsService
//     .list()
//     .then((data) => res.json({ data }))
//     .catch(next);
// }

module.exports = {
  read: [asyncErrorBoundary(productExists), read],
  list: asyncErrorBoundary(list),
  listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
  listPriceSummary: asyncErrorBoundary(listPriceSummary),
  listTotalWeightByProduct: asyncErrorBoundary(listTotalWeightByProduct),
};
