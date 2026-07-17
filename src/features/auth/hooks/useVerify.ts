import { useState } from "react";

import { authApi } from "../api/auth.api";

export function useVerify(){

    const [loading,setLoading]=useState(false);

    const [error,setError]=useState("");

    const [success,setSuccess]=useState(false);

    async function verify(
        token:string,
        password:string
    ){
        try{
            setLoading(true);
            setError("");
            await authApi.verifyEmail({
                token,
                password,
            });
            setSuccess(true);
        }catch(err:any){
            setError(
                err.response?.data?.message ??
                "Verifikasi gagal."
            );
        }finally{
            setLoading(false);
        }
    }

    return{
        verify,
        loading,
        success,
        error,
    }
}