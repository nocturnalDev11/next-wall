import NavLink from "./ui/Navlink";

export default function Navbar() {
    const navigationLinks = [
        { path: "/", name: "Landing page" },
        { path: "/home", name: "Home" },
        { path: "/profile", name: "Profile" },
    ];

    return (
        <nav className="flex gap-x-2 p-2">
            {navigationLinks.map((link) => (
                <NavLink key={link.path} to={link.path}>
                    {link.name}
                </NavLink>
            ))}
        </nav>
    );
}
