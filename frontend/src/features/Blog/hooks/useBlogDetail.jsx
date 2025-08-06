import { useQuery } from "@tanstack/react-query";
import { fetchBlogById } from "@/api/blogApi";

const useBlogDetail = (id) => {
  return useQuery({
    queryKey: ["blogDetail", id],
    queryFn: () => fetchBlogById(id),
  });
};

export default useBlogDetail;
