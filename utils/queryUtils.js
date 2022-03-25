const { notExists } = require("./utils");

function getPagination(pageNumber, sizeNumber) {
  if (notExists(pageNumber) || notExists(pageNumber)) return { limit: undefined, offset: undefined };

  const page = parseInt(pageNumber) - 1;
  const size = parseInt(sizeNumber);

  const limit = size ? + size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, pageNumber, sizeNumber) => {
  if (notExists(data) || notExists(pageNumber)) return { totalItems: undefined, tutorials: undefined, totalPages: undefined, currentPage: undefined };

  const limit = parseInt(sizeNumber);
  const { count: totalItems, rows: content } = data;
  const currentPage = parseInt(pageNumber);
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, totalPages, currentPage, content };
};

const getOrder = (field, order) => {
  if (notExists(field) || notExists(order)) return;
  const ordenation = [field, order];
  return [ordenation]
}

module.exports = {
  getPagination,
  getPagingData,
  getOrder,
};