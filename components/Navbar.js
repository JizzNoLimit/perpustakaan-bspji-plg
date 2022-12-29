import Image from "next/image";
import Link from "next/link";

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
export function NavbarHome() {
    return (
        <nav className="navbar h-[80px] md:h-[70px]">
            <div className="container flex items-center justify-between px-6">

                {/* Link logo instalnsi */}
                <Link href="/"> 
                    <span className="cursor-pointer">
                        {/* Logo instansi */}
                        <Image
                            src={"/image/logo-bspji-palembang-horizontal.png"}
                            alt="logo bspji"
                            width={138}
                            height={42}
                        />
                    </span>
                </Link>

                {/* Link menu & login */}
                <div className="hidden md:flex items-center space-x-6">
                    <div className="flex space-x-4">
                        <Link href={"/"} className="nav-link">Beranda</Link>
                        <Link href={"/"} className="nav-link">Tentang</Link>
                        <Link href={"/"} className="nav-link">Struktur</Link>
                        <Link href={"/"} className="nav-link">Peraturan</Link>
                    </div>
                    <Link href="/auth/login">
                        <button className="btn px-4">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
