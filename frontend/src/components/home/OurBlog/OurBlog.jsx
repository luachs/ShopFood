import React from "react";
import "./OurBlog.css";
import CartItem from "../../CartItem/CartItem";

import ImageBig from "../../assets/images/OurBlog/ImageBig.png";
import ImageSmall1 from "../../assets/images/OurBlog/ImageSmall1.png";
import ImageSmall2 from "../../assets/images/OurBlog/ImageSmall2.png";
import ImageSmall3 from "../../assets/images/OurBlog/ImageSmall3.png";
import ImageSmall4 from "../../assets/images/OurBlog/ImageSmall4.png";
import Button from "../../Button/Button";

const BlogItems = [
  {
    img: ImageSmall1,
    date: "January 3, 2023",
    title:
      "The secret tips & tricks to prepare a perfect burger & pizza for our customers",
    desc: "Lorem ipsum dolor sit amet consectetur of a adipiscing elitilmim semper adipiscing massa gravida nisi cras enim quis nibholm varius amet gravida ut facilisis neque egestas.",
    large: true,
  },
  {
    img: ImageSmall2,
    date: "January 3, 2023",
    title: "How to prepare the perfect french fries in an air fryer",
  },
  {
    img: ImageSmall3,
    date: "January 3, 2023",
    title: "How to prepare delicious chicken tenders",
  },
  {
    img: ImageSmall4,
    date: "January 3, 2023",
    title: "7 delicious cheesecake recipes you can prepare",
  },
  {
    img: ImageBig,
    date: "January 3, 2023",
    title: "5 great pizza restaurants you should visit this city",
  },
];

const OurBlog = () => {
  return (
    <div className="blog">
      <div className="blog-header">
        <h1>Our Blog & Articles</h1>
        <Button primary>Read All Articles</Button>
      </div>
      <div className="blog-items">
        {/* Left: bài viết lớn */}
        <div>
          {BlogItems.filter((item) => item.large).map((item, index) => (
            <CartItem
              key={index}
              img={item.img}
              date={item.date}
              title={item.title}
              desc={item.desc}
              large
            />
          ))}
        </div>

        {/* Right: các bài nhỏ */}
        <div className="blog-items-right">
          {BlogItems.filter((item) => !item.large).map((item, index) => (
            <CartItem
              key={index}
              img={item.img}
              date={item.date}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurBlog;
