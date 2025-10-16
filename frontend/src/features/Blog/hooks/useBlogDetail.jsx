import { useQuery } from "@tanstack/react-query";
import blogApi from "@/api/blogsApi";

const useBlogDetail = (id) => {
  return useQuery({
    queryKey: ["blogDetail", id],
    queryFn: async () => {
      const res = await blogApi.getById(id);
      // Nếu API trả về { data: {...} }
      return res.data.data || res.data;
    },
    enabled: !!id, // chỉ chạy khi có id
  });
};

export default useBlogDetail;
