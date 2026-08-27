import globalApi from "../../shared/global.api";

const authApi = globalApi.create({
    baseURL:"api/auth",
})

/**
 * Registers a new user with the provided username, email, and password.Throw an error if the registration fails.
 * @param {Object} payload - The user data for registration such as username,email and password.
 * @returns {Promise<Object>} A promise that resolves to the response data from the server.
 */
export const registerUser = async (payload) => {
    const res = await authApi.post('/register',payload);
    return res.data.data;
}

/**
 * Logs in a user with provided email and password. Throw an error if the login fails.
 * @param {Object} payload - The user data for login such as email and password.
 * @returns {Promise<Object>} A promise that resolve to the response data from the server.
 */
export const loginUser = async (payload) => {
    const res = await authApi.post('/login',payload);
    return res.data.data;
}

/**
 * Gets the current authenticated user from backend. Throw an error if the request fails.
 * @returns {Promise<Object>} A promise that resolve to the response data from the server.
 */
export const getCurrentUser = async () => {
    const res = await authApi.get('/current-user');
    return res.data.data;
}