import Image from "next/image";
import Head from "next/head";
import cookies from "next-cookies";

export async function getServerSideProps(ctx) {
    const cookie = cookies(ctx)
    if (cookie.token) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
    return { props: {} }
}

export default function Register() {

    return (
        <>
            <Head>

            </Head>
            <main className="md:grid md:grid-cols-[70%_30%] w-screen h-screen">
                <div className="hidden md:block md:relative left-0 right-0 top-0 bottom-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
                    <Image src={'/image/perpustakaan.jpg'} alt="bspji-palembang" fill objectFit="cover" />
                </div>
                <div className="relative w-full h-full px-6 md:px-10 py-14 z-10 space-y-6">
                    <div className="text-center text-2xl md:text-2xl font-extrabold">
                        Pendaftaran<br/>Anggota
                    </div>
        
                    <form
                        className="w-full max-w-[400px] mx-auto bg-white z-20"
                    >
                        <div className="flex flex-col my-2">
                            <label htmlFor="email" className="mx-2 my-1 text-sm">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Username"
                                className="input"
                            />
                            {/* {errors.email && (
                                <span className="text-xs pt-2">
                                    ⚠️ Email tidak boleh kosong
                                </span>
                            )} */}
                        </div>

                        <div className="flex flex-col my-2">
                            <label htmlFor="email" className="mx-2 my-1 text-sm">
                                Nama lengkap
                            </label>
                            <input
                                type="text"
                                id="nama"
                                placeholder="Nama lengkap"
                                className="input"
                            />
                            {/* {errors.email && (
                                <span className="text-xs pt-2">
                                    ⚠️ Email tidak boleh kosong
                                </span>
                            )} */}
                        </div>

                        <div className="flex flex-col my-2">
                            <label htmlFor="email" className="mx-2 my-1 text-sm">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
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
                                type="password"
                                id="password"
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
                            Daftar
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
