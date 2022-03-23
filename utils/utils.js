function exists(value) {
  return value !== null && value !== undefined;
}

function notExists(value) {
  return value === null || value === undefined;
}

module.exports = {
  exists,
  notExists,
};