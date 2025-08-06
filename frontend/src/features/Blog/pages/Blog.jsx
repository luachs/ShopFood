import React from "react";
import HeaderBlog from "../components/HeaderBlog/HeaderBlog";
import ListBlog from "../components/ListBlog/ListBlog";

const Blog = () => {
  return (
    <div className="container page-blog">
      <HeaderBlog />
      <ListBlog />
    </div>
  );
};

export default Blog;
