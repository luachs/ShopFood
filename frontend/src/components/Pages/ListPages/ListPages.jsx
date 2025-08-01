import React from "react";
import "./ListPages.css";
import CartItem from "../../CartItem/CartItem";

import ImageBig from "../../assets/images/OurBlog/ImageBig.png";
import ImageSmall1 from "../../assets/images/OurBlog/ImageSmall1.png";
import ImageSmall2 from "../../assets/images/OurBlog/ImageSmall2.png";
import ImageSmall3 from "../../assets/images/OurBlog/ImageSmall3.png";
import ImageSmall4 from "../../assets/images/OurBlog/ImageSmall4.png";

const BlogItems = [
  {
    img: ImageSmall1,
    date: "January 3, 2023",
    title:
      "The secret tips & tricks to prepare a perfect burger & pizza for our customers",
    desc: "Lorem ipsum dolor sit amet consectetur of a adipiscing elitilmim semper adipiscing massa gravida nisi cras enim quis nibholm varius amet gravida ut facilisis neque egestas.",
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
    img: ImageSmall2,
    date: "January 3, 2023",
    title: "How to prepare the perfect french fries in an air fryer",
  },
  {
    img: ImageSmall1,
    date: "January 3, 2023",
    title:
      "The secret tips & tricks to prepare a perfect burger & pizza for our customers",
    desc: "Lorem ipsum dolor sit amet consectetur of a adipiscing elitilmim semper adipiscing massa gravida nisi cras enim quis nibholm varius amet gravida ut facilisis neque egestas.",
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
    img: ImageSmall3,
    date: "January 3, 2023",
    title: "How to prepare delicious chicken tenders",
  },
  {
    img: ImageBig,
    date: "January 3, 2023",
    title: "5 great pizza restaurants you should visit this city",
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
    img: ImageSmall1,
    date: "January 3, 2023",
    title:
      "The secret tips & tricks to prepare a perfect burger & pizza for our customers",
    desc: "Lorem ipsum dolor sit amet consectetur of a adipiscing elitilmim semper adipiscing massa gravida nisi cras enim quis nibholm varius amet gravida ut facilisis neque egestas.",
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
    img: ImageSmall2,
    date: "January 3, 2023",
    title: "How to prepare the perfect french fries in an air fryer",
  },
  {
    img: ImageSmall1,
    date: "January 3, 2023",
    title:
      "The secret tips & tricks to prepare a perfect burger & pizza for our customers",
    desc: "Lorem ipsum dolor sit amet consectetur of a adipiscing elitilmim semper adipiscing massa gravida nisi cras enim quis nibholm varius amet gravida ut facilisis neque egestas.",
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
    img: ImageSmall3,
    date: "January 3, 2023",
    title: "How to prepare delicious chicken tenders",
  },
  {
    img: ImageBig,
    date: "January 3, 2023",
    title: "5 great pizza restaurants you should visit this city",
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
];
const ListPages = () => {
  return (
    <div className="list-page">
      {BlogItems.map((item, index) => (
        <div data-aos="fade-up" key={index}>
          <CartItem
            img={item.img}
            date={item.date}
            title={item.title}
            desc={item.desc}
          />
        </div>
      ))}
    </div>
  );
};

export default ListPages;
