import axiosClient from "./axiosClient";

const paymentApi = {
  createMomo: (data) => axiosClient.post("/payment/momo", data),
  createVNPay: (data) => axiosClient.post("/payment/vnpay", data),
  createBank: (data) => axiosClient.post("/payment/bank", data),
  createCOD: (data) => axiosClient.post("/payment/cod", data),
};

export default paymentApi;
