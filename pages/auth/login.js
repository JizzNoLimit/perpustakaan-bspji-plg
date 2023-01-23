import Image from "next/image";
import Head from "next/head";
import Cookie from "js-cookie";
import { useState } from "react";
import Router from "next/router";
import Link from "next/link";
import cookies from "next-cookies";

export async function getServerSideProps(ctx) {
    const cookie = cookies(ctx)
    if(cookie.token) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
    return { props: {  } }
}

export default function Login(props) {
    const [loading, setLoading] = useState(true)
    const [feilds, setFeild] = useState({
        email: '',
        password: ''
    })

    async function handleLogin(e) {
        setLoading(false)
        e.preventDefault()
        const req = await fetch(process.env.API_SERVER + '/auth/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(feilds)
        })
        const data = await req.json()
        console.log(data.username)
        Cookie.set("token", data.token, { expires: 1, sameSite: 'lax' });
        setLoading(true)
        if (data.role === 'user') {
            return Router.push(`/${data.username}/dashboard`)
        }
        Router.push(`/${data.role}/dashboard`)
    }
    function fieldHandler(e) {
        const name = e.target.getAttribute('name')
        setFeild({
            ...feilds,
            [name]: e.target.value
        })
    }

    return (
        <>
        <Head>

        </Head>
        <main className="md:grid md:grid-cols-[70%_30%] w-screen h-screen">
            <div className="hidden md:block md:relative left-0 right-0 top-0 bottom-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40 z-10"></div>
                <Image src={'/image/bspji-palembang.jpg'} alt="bspji-palembang" fill />
            </div>
            <div className="relative w-full h-full px-6 md:px-10 py-14 z-10 space-y-6">
                    <div className="text-center text-2xl md:text-2xl font-extrabold">
                        Selamat Datang<br/>
                        Kembali
                    </div>
                    <div className="absolute bottom-24 md:bottom-10 left-0 right-0 mx-auto z-10">
                        <span className="flex justify-center w-full">
                            <Image
                                alt="logo perpustakaan bspji"
                                src="/image/logo-bspji-palembang-horizontal.png"
                                width={140}
                                height={48}
                            ></Image>
                        </span>
                    </div>
                    <form
                        onSubmit={handleLogin.bind(this)}
                        className="w-full max-w-[400px] mx-auto bg-white z-20"
                    >
                        <div className="flex flex-col my-2">
                            <label htmlFor="email" className="mx-2 my-1 text-sm">
                                Email
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="E-mail"
                                className="input"
                            />
                            {/* {errors.email && (
                                <span className="text-xs pt-2">
                                    ⚠️ Email tidak boleh kosong
                                </span>
                            )} */}
                        </div>

                        <div className="flex flex-col my-2">
                            <label htmlFor="password" className="mx-2 my-1 text-sm">
                                Password
                            </label>
                            <input
                                onChange={fieldHandler.bind(this)}
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                className="input"
                            />
                            {/* {errors.password && (
                                <span className="text-xs pt-2">
                                    ⚠️ Password tidak boleh kosong
                                </span>
                            )} */}
                        </div>
                        {/* {!status && (
                            <div className="flex space-x-3 w-full px-4 py-3 bg-red-200 text-xs rounded-lg">
                                <span className="text-xl">⚠️ </span>
                                <span>
                                    Email dan password tidak ditemukan, mohon
                                    periksa kembali akun anda
                                </span>
                            </div>
                        )} */}

                        <button
                            type="submit"
                            className={`btn-full mt-6`}
                        >
                            {loading? 'Login': 'Loading...'}
                        </button>
                    </form>
                    <div className="text-sm text-center">Belum memiliki akun? <span className="text-blue-700"><Link href={'/auth/register'}>Daftar</Link></span></div>
                    
            </div>
        </main>
        </>
    );
}
