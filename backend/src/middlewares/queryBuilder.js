// middlewares/queryBuilder.js
export function queryBuilder(model) {
  return async (req, res, next) => {
    try {
      const { sort, filter, limit, page } = req.query;

      // --- FILTER ---
      let queryObj = {};
      if (filter) {
        // filter có thể là string hoặc mảng
        const filters = Array.isArray(filter) ? filter : [filter];
        filters.forEach((f) => {
          const [key, value] = f.split("=");
          if (key && value) queryObj[key] = value;
        });
      }

      // --- SORT ---
      let sortObj = {};
      if (sort) {
        const sorts = Array.isArray(sort) ? sort : [sort];
        sorts.forEach((s) => {
          const [field, direction] = s.split(":");
          sortObj[field] = direction === "desc" ? -1 : 1;
        });
      }

      // --- PAGINATION ---
      const pageNum = Number(page) || 1;
      const limitNum = Number(limit) || 10;
      const skip = (pageNum - 1) * limitNum;

      // --- BUILD QUERY ---
      const total = await model.countDocuments(queryObj);
      const data = await model
        .find(queryObj)
        .sort(sortObj)
        .skip(skip)
        .limit(limitNum);

      res.json({
        total,
        page: pageNum,
        limit: limitNum,
        data,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi xử lý truy vấn" });
    }
  };
}
