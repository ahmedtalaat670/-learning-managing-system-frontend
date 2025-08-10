import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://learning-managing-system-backend-qd.vercel.app",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (e) => {
    Promise.reject(e);
  }
);

export default axiosInstance;
