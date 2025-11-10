// utils/buildQueryString.js
export const buildQueryString = (params = {}) => {
  const query = new URLSearchParams();

  if (params.sort)
    Object.entries(params.sort).forEach(([field, dir]) =>
      query.append("sort", `${field}:${dir}`)
    );

  if (params.filter)
    Object.entries(params.filter).forEach(([field, value]) =>
      query.append("filter", `${field}=${value}`)
    );

  if (params.page) query.append("page", params.page);
  if (params.limit) query.append("limit", params.limit);

  return query.toString();
};
