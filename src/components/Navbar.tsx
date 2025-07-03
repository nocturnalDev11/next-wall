"use client";

import { useEffect, useState } from "react";
import NavLink from "./ui/Navlink";
import { createClient } from "@/utils/supabase/client";

export default function Navbar() {
    const supabase = createClient();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const getSession = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setIsLoggedIn(!!user);
        };
        getSession();
    }, [supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();

        window.location.reload();
    };

    const navigationLinks = [
        { path: "/", name: "Landing page" },
        { path: "/home", name: "Home" },
        { path: "/profile", name: "Profile" },
    ];

    return (
        <nav className="bg-[#1877F2] shadow">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
                <div className="text-xl font-bold text-white">
                    Next Wall
                </div>

                <ul className="flex space-x-4">
                    {navigationLinks.map((link) => (
                        <li key={link.path}>
                            <NavLink to={link.path}>{link.name}</NavLink>
                        </li>
                    ))}
                    <li>
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="text-white hover:underline"
                            >
                                Logout
                            </button>
                        ) : (
                            <NavLink to="/login">Login</NavLink>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
