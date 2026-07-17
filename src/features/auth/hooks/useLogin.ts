import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { authApi } from "../api/auth.api";

import { authStorage } from "../utils/authStorage";

export function useLogin(){

    const navigate=
        useNavigate();

    const [loading,setLoading]=
        useState(false);

    const [error,setError]=
        useState("");
        
    async function login(
        email:string,
        password:string
    ){
        try{
            setLoading(true);
            setError("");
            const response=
                await authApi.login({
                    email,
                    password,
                });

            authStorage.saveSession(
                response.data.accessToken,
                response.data.refreshToken,
                response.data.user
            );
            navigate("/dashboard");

        }catch(err:any){
            setError(
                err.response?.data?.message ??
                "Email atau password salah."
            );
        }finally{
            setLoading(false);
        }
    }

    return{
        login,
        loading,
        error,
    }
}