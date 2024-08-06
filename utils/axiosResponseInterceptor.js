export const useAxiosResponseInterceptor = () => {
  axios.interceptors.response.use(
    (response) => {
      console.log("Interceptor Response:", response); // Debug log
      return response;
    },
    (error) => {
      console.error("Interceptor Error:", error); // Debug log
      return Promise.reject(error);
    }
  );
};
