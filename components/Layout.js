import Footer from "./Footer.js";
import Navbar, { NavbarHome } from "./Navbar.js";
import SidebarAdmin, {SidebarKepala, SidebarUser} from "./Sidebar.js";

export default function AdminLayout({ children }) {
    return (
        <div className="h-screen w-screen md:flex bg-[#EDF1F3] overflow-hidden">
            <SidebarAdmin />
            <div className="w-full p-4 md:p-4">
                {children}
            </div>
        </div>
    );
}

export function Layout({ user, children }) {
    return (
        <div className="h-full">
            <NavbarHome user={user}/>
            {children}
            <Footer />
        </div>
    );
}

export function KepalaLayout({children}) {
    return (
        <div className="md:flex bg-[#EDF1F3]">
            <SidebarKepala />
            <div className="w-full p-4 md:p-4">
                {children}
            </div>
        </div>
    )
}

export function UserLayout({ children }) {
    return (
        <div className="md:flex bg-[#EDF1F3]">
            <SidebarUser />
            <div className="w-full p-4 md:p-4">
                {children}
            </div>
        </div>
    );
}
