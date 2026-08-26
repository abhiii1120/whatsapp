import globalApi from "../../shared/global.api";

const authApi = globalApi.create({
    baseURL:"/auth",
})

export const registerUser = async (payload) => {
    const res = await authApi.post('/register',payload);
    return res.data;
}