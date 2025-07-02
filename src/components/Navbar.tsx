import NavLink from "./ui/Navlink";

export default function Navbar() {
    const navigationLinks = [
        { path: "/", name: "Landing page" },
        { path: "/home", name: "Home" },
        { path: "/profile", name: "Profile" },
    ];

    return (
        <nav className="bg-[#1877F2] shadow">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                Next Wall
                </div>

                <ul className="flex space-x-4">
                    {navigationLinks.map((link) => (
                        <li key={link.path}>
                            <NavLink to={link.path}>{link.name}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}