import React from "react";
import "./BlogDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import useBlogDetail from "@/features/Blog/hooks/useBlogDetail";
import Button from "@/components/Button/Button";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useBlogDetail(id);

  if (isLoading) return <p>Đang tải bài viết...</p>;
  if (error || !data) return <p>Không tìm thấy bài viết.</p>;

  const handleBack = () => {
    navigate(-1); // Quay lại trang trước
  };

  return (
    <div className="blog-detail" data-aos="zoom-up">
      <Button onClick={handleBack}> ← Quay lại</Button>
      <h1 className="blog-detail-title">{data.title}</h1>
      {data.createdAt && (
        <p className="blog-detail-date">
          {new Date(data.createdAt).toLocaleDateString("vi-VN")}
        </p>
      )}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
};

export default BlogDetail;
