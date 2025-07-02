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
        "w-full py-3 px-4 inline-flex justify-center items-center gap-2 text-sm font-medium text-center rounded-lg";

    const activeClasses = isActive
        ? "bg-gray-600 text-white"
        : "bg-transparent text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-500 dark:focus:text-gray-500";

    return (
        <Link
            href={to}
            className={`${baseClasses} ${activeClasses}`}
            aria-current={isActive ? "page" : undefined}
        >
            {children}
        </Link>
    );
}
