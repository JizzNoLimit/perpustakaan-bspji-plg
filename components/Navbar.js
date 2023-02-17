import Image from "next/image";
import Link from "next/link";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

// Navbar Dashboard
export default function Navbar(props) {
    
    return (
        <nav className="fixed flex items-center w-full top-0 left-0 right-0 md:left-[258px] h-[72px] md:h-[60px] px-4 bg-white">
            <div className="h-full md:hidden">
                <h1 className="text-lg font-extrabold mt-6 ml-4">
                    BSPJI PALEMBANG
                </h1>
                <span className="absolute top-4 bottom-0 mt-auto mb-auto right-8 z-30">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-9 h-9"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 9h16.5m-16.5 6.75h16.5"
                        />
                    </svg>
                </span>
            </div>
        </nav>
    );
}

// Navbar Home
export function NavbarHome({user}) {
    // user = { id: '2342343434', role: 'admin', username: 'adminGanteng', nama: 'Muhammad Ajiz Alfarizi'}
    return (
        <nav className="navbar h-[80px] md:h-[70px]">
            <div className="container flex items-center justify-between px-6">

                {/* Link logo instalnsi */}
                <Link href="/"> 
                    <div className="relative w-40 h-[50px] cursor-pointer">
                        {/* Logo instansi */}
                        <Image
                            src={"/image/logo-bspji-palembang-horizontal.png"}
                            alt="logo bspji"
                            fill
                            sizes="160px"
                            style={{objectFit:"contain"}}
                        />
                    </div>
                </Link>

                {/* Link menu & login */}
                <div className="hidden md:flex items-center space-x-6">
                    <div className="flex space-x-4">
                        <Link href={"/"} className="nav-link">Beranda</Link>
                        <Link href={"/"} className="nav-link">Tentang</Link>
                        <Link href={"/"} className="nav-link">Struktur</Link>
                        <Link href={"/"} className="nav-link">Peraturan</Link>
                    </div>
                    {user.role === 'kepala' && (<Link href={`/${user.role}/dashboard`}>
                        <div className="flex space-x-1">
                            <div className="w-10 h-10 bg-emerald-600 rounded-full"></div>
                            <div>
                                <h1 className="text-sm">{user.role}</h1>
                                <p className="text-xs text-gray-500">{user.id}</p>
                            </div>
                        </div>
                    </Link>)}
                    {user.role === 'admin' && (<Link href={`/${user.role}/dashboard`}>
                        <div className="flex space-x-1">
                            <div className="w-10 h-10 bg-emerald-600 rounded-full"></div>
                            <div>
                                <h1 className="text-sm">{user.role}</h1>
                                <p className="text-xs text-gray-500">{user.id}</p>
                            </div>
                        </div>
                    </Link>)}
                    {user.role === 'user' && (<Link href={`/${user.username}/dashboard`}>
                        <div className="flex space-x-2">
                            <div className="w-10 h-10 bg-emerald-600 rounded-full"></div>
                            <div>
                                <h1 className="text-sm">{user.nama}</h1>
                                <p className="text-xs text-gray-500">{user.id}</p>
                            </div>
                        </div>
                    </Link>)}
                    {!user && (<Link href={`/auth/login`}>
                        <button className={`btn px-4`}>
                            Login
                        </button>
                    </Link>)}
                </div>
            </div>
        </nav>
    );
}
