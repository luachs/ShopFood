import React from "react";
import "./BlogDetail.css";

import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

import useBlogDetail from "@/features/Blog/hooks/useBlogDetail";

const BlogDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useBlogDetail(id);
  console.log(useBlogDetail(id));
  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Không tìm thấy bài viết</p>;

  return (
    <div className="blog-detail" data-aos="zoom-up">
      <h1 className="blog-detail-title">{data.title}</h1>
      <p>{data.date}</p>
      <img src={data.img} alt={data.title} />
      <div className="blog-content">
        <ReactMarkdown>{data.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogDetail;
