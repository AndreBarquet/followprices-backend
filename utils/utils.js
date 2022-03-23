function exists(value) {
  return value !== null && value !== undefined;
}

function notExists(value) {
  return value === null || value === undefined;
}

function getOffsetByPageNumber(page, size) {
  if (notExists(page) || notExists(size)) return;

  const pageNumber = parseInt(page);
  const pageSize = parseInt(size);

  const startIndex = pageNumber * pageSize;
  return pageNumber === 1 ? 0 : startIndex;
}

export {
  exists,
  notExists,
  getOffsetByPageNumber,
};