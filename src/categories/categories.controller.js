const categoriesService = require("./categories.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  const data = await categoriesService.list();
  req.json({ data });
}

// function list(req, res, next) {
//   categoriesService
//     .list()
//     .then((data) => res.json({ data }))
//     .catch(next);
// }

module.exports = {
  list: asyncErrorBoundary(list),
};