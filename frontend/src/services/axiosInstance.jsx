import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

// Add a response interceptor to handle 401 Unauthorized errors
axiosInstance.interceptors.response.use(
  // If the response is successful, return it
  (response) => {
    return response;
  },
  // If the response is an error, handle it
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest.retry) {
      // Set retry to true to avoid infinite loops
      originalRequest.retry = true;

      try {
        // Send a request to refresh the access token
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/refresh`,
          {},
          {
            withCredentials: true,
          }
        );
        // Retry the original request with the new access token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If the refresh request fails, log the error
        console.error("Token refresh failed:", refreshError);
      }
    }

    // If the error is not 401 Unauthorized or the request has been retried, return the error
    return Promise.reject(error);
  }
);

export default axiosInstance;
