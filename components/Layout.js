import Navbar, { NavbarHome } from "./Navbar.js";
import Sidebar, { SidebarUser } from "./Sidebar.js";

export default function DashboardLayout({ navProfile, children }) {
    return (
        <div className="md:flex bg-[#EDF1F3]">
            <Sidebar />
            <div className="w-full p-4 md:p-4">
                <Navbar navProfile={navProfile} />
                {children}
            </div>
        </div>
    );
}

export function Layout({ children }) {
    return (
        <div>
            <NavbarHome />
            {children}
        </div>
    );
}

export function UserLayout({ user, children }) {
    return (
        <div className="md:flex bg-[#EDF1F3]">
            <SidebarUser />
            <div className="w-full p-4 md:p-4">
                <Navbar navProfile={user} />
                {children}
            </div>
        </div>
    );
}
