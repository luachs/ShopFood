import React from "react";
import "./BlogDetail.css";
import { useParams } from "react-router-dom";
import useBlogDetail from "@/features/Blog/hooks/useBlogDetail";

const BlogDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useBlogDetail(id);

  if (isLoading) return <p>Đang tải bài viết...</p>;
  if (error || !data) return <p>Không tìm thấy bài viết.</p>;

  // Lấy ảnh đầu tiên trong content nếu có

  return (
    <div className="blog-detail" data-aos="zoom-up">
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
