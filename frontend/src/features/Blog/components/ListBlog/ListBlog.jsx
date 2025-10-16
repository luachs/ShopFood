import React, { useEffect, useState } from "react";
import "./ListBlog.css";
import CartItem from "@/components/CartItem/CartItem";
import { Link } from "react-router-dom";

import blogApi from "@/api/blogsApi";
import config from "@/config/config";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await blogApi.getAll();
        setBlogs(res.data.data || res.data || []);
      } catch (err) {
        console.error("Lỗi khi fetch blog:", err);
      }
    };
    fetchBlogs();
  }, []);

  const extractFirstImage = (html) => {
    if (!html) return null;
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : null;
  };

  return (
    <div className="list-blog">
      {blogs.length === 0 ? (
        <p>Chưa có bài viết nào.</p>
      ) : (
        blogs.map((item) => (
          <Link to={`${config.routes.blog}/${item._id}`} key={item._id}>
            <div data-aos="fade-up">
              <CartItem
                id={item._id}
                img={
                  extractFirstImage(item.content) ||
                  "https://placehold.co/300x200"
                }
                date={
                  item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("vi-VN")
                    : ""
                }
                title={item.title}
                desc={item.description || ""}
              />
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ListBlog;
