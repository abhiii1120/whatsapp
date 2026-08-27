import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        accessToken:null,
        isLoading :true,
        error:null,
    },
    reducers:{
        setUser : (state,action) => {
            state.user = action.payload;
        },
        setAccessToken : (state,action) => {
            state.accessToken = action.payload;
        },
        setLoading:(state,action) => {
            state.isLoading  = action.payload;
        },
        setError:(state,action) => {
            state.error =action.payload
        }
    }
})

export const {setUser,setAccessToken,setError,setLoading} = authSlice.actions;
export default authSlice.reducer;