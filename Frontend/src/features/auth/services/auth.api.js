import globalApi from "../../shared/global.api";

const authApi = globalApi.create({
    baseURL:"api/auth",
})

export const registerUser = async (payload) => {
    const res = await authApi.post('/register',payload);
    return res.data;
}

export const loginUser = async (payload) => {
    const res = await authApi.post('/login',payload);
    return res.data;
}