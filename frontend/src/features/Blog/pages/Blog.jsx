import React, { useState } from "react";
import HeaderBlog from "../components/HeaderBlog/HeaderBlog";
import ListBlog from "../components/ListBlog/ListBlog";
import Pagination from "@/components/Pagination/Pagination";

const Blog = () => {
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  return (
    <div className="container page-blog">
      <HeaderBlog />
      <ListBlog setPagination={setPagination} page={page} />
      <Pagination pagination={pagination} setPage={setPage} page={page} />
    </div>
  );
};

export default Blog;
