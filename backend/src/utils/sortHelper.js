exports.getSortOptions = (req, defaultField = "createAt") => {
  const sortField = req.query.sort || defaultField;
  const sortOrder = req.query.order === "desc" ? -1 : 1;
  return { [sortField]: sortOrder };
};
