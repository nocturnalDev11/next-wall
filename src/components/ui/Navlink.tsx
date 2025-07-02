"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
    to: string;
    children: ReactNode;
}

export default function NavLink({ to, children }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = pathname === to;

    const baseClasses =
        "block py-2 px-3 rounded-sm";

    const activeClasses =
        "text-white bg-blue-600";

    const inactiveClasses =
        "text-white hover:bg-blue-500";

    return (
        <Link
            href={to}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
            aria-current={isActive ? "page" : undefined}
        >
            {children}
        </Link>
    );
}
