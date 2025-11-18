import React from "react";
import "./Pagination.css";

const Pagination = ({ pagination, setPage, page }) => {
  const { totalPages } = pagination;

  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
        Prev
      </button>

      <span>
        Page {page} / {totalPages || 1}
      </span>

      <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
