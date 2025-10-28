import React, { useEffect, useState } from "react";
import "./OurBlog.css";
import CartItem from "@/components/CartItem/CartItem";

import ImageBig from "@/assets/images/OurBlog/ImageBig.png";
import ImageSmall1 from "@/assets/images/OurBlog/ImageSmall1.png";
import ImageSmall2 from "@/assets/images/OurBlog/ImageSmall2.png";
import ImageSmall3 from "@/assets/images/OurBlog/ImageSmall3.png";
import ImageSmall4 from "@/assets/images/OurBlog/ImageSmall4.png";
import Button from "@/components/Button/Button";
import { Link } from "react-router-dom";
import config from "@/config/config";
import blogApi from "@/api/blogsApi";

const OurBlog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const res = await blogApi.getAll();

      setBlogs(res.data);
    };
    fetchApi();
  }, []);

  if (!blogs.length) return <p>Loading</p>;

  const largeBlog = blogs[0];
  const smallBlog = blogs.slice(1, 5);

  const extractFirstImage = (html) => {
    if (!html) return null;
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : null;
  };
  return (
    <div className="blog">
      <div className="blog-header" data-aos="fade-up">
        <h1>Our Blog & Articles</h1>
        <Link to={config.routes.blog}>
          <Button primary>Read All Articles</Button>
        </Link>
      </div>
      <div className="blog-items">
        {/* Left: bài viết lớn */}
        <div data-aos="fade-up" data-aos-duration="500">
          {largeBlog && (
            <Link
              to={`${config.routes.blog}/${largeBlog._id}`}
              key={largeBlog._id}
            >
              <CartItem
                id={largeBlog._id}
                img={
                  extractFirstImage(largeBlog.content) ||
                  "https://placehold.co/300x200"
                }
                date={
                  largeBlog.createdAt
                    ? new Date(largeBlog.createdAt).toLocaleDateString("vi-VN")
                    : ""
                }
                title={largeBlog.title}
                desc={largeBlog.desc}
                large
              />
            </Link>
          )}
        </div>

        {/* Right: các bài nhỏ */}
        <div
          className="blog-items-right"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          {smallBlog &&
            smallBlog.map((item) => (
              <Link to={`${config.routes.blog}/${item._id}`} key={item._id}>
                <CartItem
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
                  desc={item.desc}
                />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OurBlog;
