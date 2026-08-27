import { store } from "../../../app/app.store";
import globalApi from "../../shared/global.api";

const authApi = globalApi.create({
  baseURL: "/api/auth",
});

authApi.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;

    console.log("Access Token from store", accessToken);

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await authApi.post("/refresh-token");
        const newAccessToken = refreshResponse.data.data.accessToken

        store.dispatch({type:"auth/setAccessToken",payload:newAccessToken})

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
        return authApi(originalRequest)
      } catch (refreshError) {
        console.error("Refresh token failed:",refreshError)
        return Promise.reject(refreshError)
      }
    }
        return Promise.reject(error);
  },
);

/**
 * Registers a new user with the provided username, email, and password.Throw an error if the registration fails.
 * @param {Object} payload - The user data for registration such as username,email and password.
 * @returns {Promise<Object>} A promise that resolves to the response data from the server.
 */
export const registerUser = async (payload) => {
  const res = await authApi.post("/register", payload);
  return res.data.data;
};

/**
 * Logs in a user with provided email and password. Throw an error if the login fails.
 * @param {Object} payload - The user data for login such as email and password.
 * @returns {Promise<Object>} A promise that resolve to the response data from the server.
 */
export const loginUser = async (payload) => {
  const res = await authApi.post("/login", payload);
  return res.data.data;
};

/**
 * Gets the current authenticated user from backend. Throw an error if the request fails.
 * @returns {Promise<Object>} A promise that resolve to the response data from the server.
 */
export const getCurrentUser = async () => {
  const res = await authApi.get("/current-user");
  return res.data.data;
};
