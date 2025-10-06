import axiosClient from "./axiosClient";

const meApi = {
  get: () => axiosClient.get("/me/profile"),
};

export default meApi;
