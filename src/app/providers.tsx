"use client"

import { ReactNode } from "react";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <HeroUIProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
                {children}
            </ThemeProvider>
        </HeroUIProvider>
    );
}
