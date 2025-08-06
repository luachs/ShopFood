import { BlogItems } from "@/data/blogMock";

export const fetchBlogById = async (id) => {
  await new Promise((r) => setTimeout(r, 500));
  const blog = BlogItems.find((item) => item.id === parseInt(id));
  if (!blog) throw new Error("Not found");
  return blog;
};
