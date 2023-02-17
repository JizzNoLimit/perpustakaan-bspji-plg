import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import Cookies from 'js-cookie'

export default function SidebarAdmin() {

    const router = useRouter();
    const [active, setActive] = useState(router.pathname);

    const handleActive = () => {
        setActive(router.pathname);
    };

    const handleLogout = () => {
        Cookies.remove('token')
        Router.push('/')
    }

    return (
        <div className="relative md:static md:w-[228px] md:min-w-[254px] md:block bg-white z-50">
            <div className="fixed md:sticky md:h-screen flex justify-center md:flex-col md:justify-between md:block md:px-4 py-4 md:py-3 bg-white md:bg-none md:top-0 bottom-0 left-0  md:space-x-0 w-full rounded-t-3xl md:rounded-none">
                <div className="flex justify-between w-[88%] md:w-full md:flex-col md:space-y-6">
                    <Link href="/">
                        <div className="relative hidden md:flex w-full h-14 justify-start px-4 cursor-pointer rounded-lg">
                            <Image
                                src={
                                    "/image/logo-bspji-palembang-horizontal.png"
                                }
                                alt="logo bspji"
                                fill
                                sizes="200px"
                                style={{objectFit: 'contain'}}
                            />
                        </div>
                    </Link>
                    <div className="flex w-dashboardfull md:flex-col space-y-0 md:space-y-2 space-x-4 md:space-x-0">
                        <Link href={'/admin/dashboard'}>
                            <button
                                onClick={() => handleActive()}
                                className={`${active.slice(6) === "/dashboard"
                                    ? "bg-[#E0E4E7]"
                                    : "bg-white"
                                    } flex justify-center md:justify-start items-center w-full px-3 py-4 md:py-3 space-x-3 rounded-xl md:hover:bg-[#e0e4e7]`}
                            >
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className={`${active.slice(6) === "/dashboard"
                                            ? "fill-[#FF6370]"
                                            : "fill-none"
                                            } w-6 h-6`}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                                        />
                                    </svg>
                                </span>
                                <span className="hidden md:block">
                                    Dashboard
                                </span>
                            </button>
                        </Link>
                        <Link href={'/admin/dashboard/buku'}>
                            <button
                                onClick={() => handleActive()}
                                className={`${active.slice(6, 21) === "/dashboard/buku"
                                    ? "bg-[#E0E4E7]"
                                    : "bg-white"
                                    } flex justify-center md:justify-start items-center w-full px-3 py-4 md:py-3 space-x-3 rounded-xl md:hover:bg-[#e0e4e7]`}
                            >
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className={`${active.slice(6, 21) ===
                                            "/dashboard/buku"
                                            ? "fill-[#FF6370]"
                                            : "fill-none"
                                            } h-6 w-6`}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                                        />
                                    </svg>
                                </span>
                                <span className="hidden md:block">Data Buku</span>
                            </button>
                        </Link>
                        <Link href={'/admin/dashboard/users'}>
                            <button
                                onClick={() => handleActive()}
                                className={`${active.slice(6) === "/dashboard/users"
                                    ? "bg-[#E0E4E7]"
                                    : "bg-white"
                                    } flex justify-center md:justify-start items-center w-full px-3 py-4 md:py-3 space-x-3 rounded-xl md:hover:bg-[#e0e4e7]`}
                            >
                                <span>
                                    <svg 
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke="currentColor" 
                                    className={`${active.slice(6) === "/dashboard/users"
                                        ? "fill-[#FF6370]"
                                        : "fill-none"
                                        } h-6 w-6`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </span>
                                <span className="hidden md:block">Anggota</span>
                            </button>
                        </Link>
                        <Link href={'/admin/dashboard/pinjam'}>
                            <button
                                onClick={() => handleActive()}
                                className={`${active.slice(6) === "/dashboard/pinjam"
                                    ? "bg-[#E0E4E7]"
                                    : "bg-white"
                                    } flex justify-center md:justify-start items-center w-full px-3 py-4 md:py-3 space-x-3 rounded-xl md:hover:bg-[#e0e4e7]`}
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke="currentColor"
                                        className={`${active.slice(6) ===
                                            "/dashboard/pinjam"
                                            ? "fill-[#FF6370]"
                                            : "fill-none"
                                            } h-6 w-6`}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                    </svg>
                                </span>
                                <span className="hidden md:block">Peminjaman</span>
                            </button>
                        </Link>
                        <Link href={'/admin/dashboard/kembali'}>
                            <button
                                onClick={() => handleActive()}
                                className={`${active.slice(6) === "/dashboard/kembali"
                                    ? "bg-[#E0E4E7]"
                                    : "bg-white"
                                    } flex justify-center md:justify-start items-center w-full px-3 py-4 md:py-3 space-x-3 rounded-xl md:hover:bg-[#e0e4e7]`}
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke="currentColor" 
                                    className={`${active.slice(6) ===
                                            "/dashboard/kembali"
                                            ? "fill-[#FF6370]"
                                            : "fill-none"
                                            } h-6 w-6`}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                                    </svg>
                                </span>
                                <span className="hidden md:block">Pengembalian</span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="absolute bottom-4 left-0 px-3 hidden md:block w-full h-14 text-white font-bold">
                    <button
                        onClick={handleLogout.bind(this)}
                        className="flex justify-center w-full py-3 bg-red-500 rounded-xl space-x-2"
                    >
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                />
                            </svg>
                        </span>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export function SidebarKepala() {

    const router = useRouter();
    const [active, setActive] = useState(router.pathname);

    const handleActive = () => {
        console.log(active.slice(7))
        setActive(router.pathname);
    };

    const handleLogout = () => {
        Cookies.remove('token')
        Router.push('/')
    }
    
    return (
        <div className="relative md:static md:w-[228px] md:min-w-[254px] md:block bg-white z-50">
            <div className="fixed md:sticky md:h-screen flex justify-center md:flex-col md:justify-between md:block md:px-3 py-4 md:py-3 bg-white md:bg-none md:top-0 bottom-0 left-0  md:space-x-0 w-full rounded-t-3xl md:rounded-none">
                <div className="flex justify-between w-[88%] md:w-full md:flex-col md:space-y-6">
                    <Link href="/">
                        <span className="hidden md:flex w-full justify-start px-4 py-1 cursor-pointer rounded-lg">
                            <Image
                                src={
                                    "/image/logo-bspji-palembang-horizontal.png"
                                }
                                alt="logo bspji"
                                width={138}
                                height={42}
                            />
                        </span>
                    </Link>
                    <div className="flex w-dashboardfull md:flex-col space-y-0 md:space-y-2 space-x-4 md:space-x-0">
                        <Link href={{
                            pathname: '/[user]/dashboard',
                            query: { user: router.query.user }
                        }}>
                            <button
                                onClick={() => handleActive()}
                                className={`${active.slice(7) === "/dashboard"
                                    ? "bg-[#E0E4E7]"
                                    : "bg-white"
                                    } flex justify-center md:justify-start items-center w-full px-3 py-4 md:py-3 space-x-3 rounded-xl md:hover:bg-[#e0e4e7]`}
                            >
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className={`${active.slice(7) === "/dashboard"
                                            ? "fill-[#FF6370]"
                                            : "fill-none"
                                            } w-6 h-6`}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                                        />
                                    </svg>
                                </span>
                                <span className="hidden md:block">
                                    Dashboard
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="absolute bottom-4 left-0 px-3 hidden md:block w-full h-14 text-white font-bold">
                    <button
                        onClick={handleLogout.bind(this)}
                        className="flex justify-center w-full py-3 bg-red-500 rounded-xl space-x-2"
                    >
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                />
                            </svg>
                        </span>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export function SidebarUser() {

    const router = useRouter();
    const [active, setActive] = useState(router.pathname);

    const handleActive = () => {
        console.log(active.slice(7))
        setActive(router.pathname);
    };

    const handleLogout = () => {
        Cookies.remove('token')
        Router.push('/')
    }

    return (
        <div className="relative md:static md:w-[228px] md:min-w-[254px] md:block bg-white z-50">
            <div className="fixed md:sticky md:h-screen flex justify-center md:flex-col md:justify-between md:block md:px-3 py-4 md:py-3 bg-white md:bg-none md:top-0 bottom-0 left-0  md:space-x-0 w-full rounded-t-3xl md:rounded-none">
                <div className="flex justify-between w-[88%] md:w-full md:flex-col md:space-y-6">
                    <Link href="/">
                        <span className="hidden md:flex w-full justify-start px-4 py-1 cursor-pointer rounded-lg">
                            <Image
                                src={
                                    "/image/logo-bspji-palembang-horizontal.png"
                                }
                                alt="logo bspji"
                                width={138}
                                height={42}
                            />
                        </span>
                    </Link>
                    <div className="flex w-dashboardfull md:flex-col space-y-0 md:space-y-2 space-x-4 md:space-x-0">
                        <Link href={{
                            pathname: '/[user]/dashboard',
                            query: { user: router.query.user }
                        }}>
                            <button
                                onClick={() => handleActive()}
                                className={`${active.slice(7) === "/dashboard"
                                    ? "bg-[#E0E4E7]"
                                    : "bg-white"
                                    } flex justify-center md:justify-start items-center w-full px-3 py-4 md:py-3 space-x-3 rounded-xl md:hover:bg-[#e0e4e7]`}
                            >
                                <span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className={`${active.slice(7) === "/dashboard"
                                            ? "fill-[#FF6370]"
                                            : "fill-none"
                                            } w-6 h-6`}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                                        />
                                    </svg>
                                </span>
                                <span className="hidden md:block">
                                    Dashboard
                                </span>
                            </button>
                        </Link>
                        
                    </div>
                </div>
                <div className="absolute bottom-4 left-0 px-3 hidden md:block w-full h-14 text-white font-bold">
                    <button
                        onClick={handleLogout.bind(this)}
                        className="flex justify-center w-full py-3 bg-red-500 rounded-xl space-x-2"
                    >
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                                />
                            </svg>
                        </span>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
