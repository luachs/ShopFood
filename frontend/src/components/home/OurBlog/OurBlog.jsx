import React from "react";
import "./OurBlog.css";
import CartItem from "../../CartItem/CartItem";

import ImageBig from "../../assets/images/OurBlog/ImageBig.png";
import ImageSmall1 from "../../assets/images/OurBlog/ImageSmall1.png";
import ImageSmall2 from "../../assets/images/OurBlog/ImageSmall2.png";
import ImageSmall3 from "../../assets/images/OurBlog/ImageSmall3.png";
import ImageSmall4 from "../../assets/images/OurBlog/ImageSmall4.png";
import Button from "../../Button/Button";
import { Link } from "react-router-dom";
import config from "../../../config/config";

const BlogItems = [
  {
    id: 5,
    img: ImageBig,
    date: "January 3, 2023",
    title:
      "The secret tips & tricks to prepare a perfect burger & pizza for our customers",
    desc: "Lorem ipsum dolor sit amet consectetur of a adipiscing elitilmim semper adipiscing massa gravida nisi cras enim quis nibholm varius amet gravida ut facilisis neque egestas.",
    large: true,
  },
  {
    id: 1,
    img: ImageSmall1,
    date: "January 3, 2023",
    title:
      "The secret tips & tricks to prepare a perfect burger & pizza for our customers",
    desc: "Lorem ipsum dolor sit amet consectetur of a adipiscing elitilmim semper adipiscing massa gravida nisi cras enim quis nibholm varius amet gravida ut facilisis neque egestas.",
  },
  {
    id: 2,
    img: ImageSmall2,
    date: "January 3, 2023",
    title: "How to prepare the perfect french fries in an air fryer",
  },
  {
    id: 3,
    img: ImageSmall3,
    date: "January 3, 2023",
    title: "How to prepare delicious chicken tenders",
  },
  {
    id: 4,
    img: ImageSmall4,
    date: "January 3, 2023",
    title: "7 delicious cheesecake recipes you can prepare",
  },
];

const OurBlog = () => {
  return (
    <div className="blog">
      <div className="blog-header" data-aos="fade-up">
        <h1>Our Blog & Articles</h1>
        <Link to={config.routes.pages}>
          <Button primary>Read All Articles</Button>
        </Link>
      </div>
      <div className="blog-items">
        {/* Left: bài viết lớn */}
        <div data-aos="fade-up" data-aos-duration="500">
          {BlogItems.filter((item) => item.large).map((item) => (
            <Link to={`${config.routes.pages}/${item.id}`} key={item.id}>
              <CartItem
                id={item.id}
                img={item.img}
                date={item.date}
                title={item.title}
                desc={item.desc}
                large
              />
            </Link>
          ))}
        </div>

        {/* Right: các bài nhỏ */}
        <div
          className="blog-items-right"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          {BlogItems.filter((item) => !item.large).map((item) => (
            <Link to={`${config.routes.pages}/${item.id}`} key={item.id}>
              <CartItem
                img={item.img}
                date={item.date}
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
