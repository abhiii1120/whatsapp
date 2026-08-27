import axios from "axios";
import { store } from "../../app/app.store";

const globalApi = axios.create({
    baseURL:"/api",
    withCredentials:true,
})

globalApi.interceptors.request.use(
    (config) => {
        const accessToken = store.getState().auth.accessToken

        console.log("Access Token from store",accessToken)
        if(accessToken){
            config.headers["Authorization"] = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }    
)

export default globalApi;