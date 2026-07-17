import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

import { verifySchema } from "../schemas/verify.schema";
import type { VerifyFormData } from "../schemas/verify.schema";

import { useVerify } from "../hooks/useVerify";

export default function VerifyForm() {

    const navigate=useNavigate();

    const [searchParams]=useSearchParams();

    const token=searchParams.get("token");

    const {
        verify,
        loading,
        success,
        error,
    }=useVerify();

    const{
        register,
        handleSubmit,
        formState:{errors},
    }=useForm<VerifyFormData>({
        resolver:zodResolver(
            verifySchema
        ),
    });

    useEffect(()=>{

        if(success){

            const timeout=setTimeout(()=>{

                navigate("/login");

            },3000);

            return()=>clearTimeout(timeout);

        }

    },[success,navigate]);

    function onSubmit(data:VerifyFormData){

        if(!token){

            return;

        }

        verify(
            token,
            data.password
        );

    }

    if(!token){

        return(

            <div className="text-center">

                <h2 className="text-2xl font-bold">

                    Token tidak ditemukan

                </h2>

                <Link to="/register">

                    Kembali ke Register

                </Link>

            </div>

        )

    }

    if(success){

        return(

            <div className="space-y-4 text-center">

                <h2 className="text-3xl font-bold text-green-600">

                    Email berhasil diverifikasi

                </h2>

                <p>

                    Anda akan diarahkan ke halaman login...

                </p>

            </div>

        )

    }

    return(

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >

            <h2 className="text-3xl font-bold text-center">

                Aktivasi Akun

            </h2>

            {error &&(

                <div className="rounded bg-red-50 p-3 text-red-600">

                    {error}

                </div>

            )}

            <Input
                label="Password"
                type="password"
                {...register("password")}
                error={errors.password?.message}
            />
            <Input
                label="Konfirmasi Password"
                type="password"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
            />
            <Button
                loading={loading}
                type="submit"
            >
                Aktivasi Akun
            </Button>
        </form>

    );

}