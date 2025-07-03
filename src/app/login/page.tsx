"use client"

import { useState } from "react";
import { login, signup } from "./actions";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        await login(formData);
        router.push("/home"); 
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        await signup(formData);
        router.push("/profile"); 
    }

    return (
        <form className="max-w-md mx-auto p-4 space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email:
                </label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="Enter your email"
                    autoFocus
                    required
                    autoComplete="email"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password:
                </label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                />
            </div>

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={handleLogin}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition"
                >
                    Log in
                </button>
                <button
                    type="button"
                    onClick={handleSignup}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition"
                >
                    Sign up
                </button>
            </div>

            <div className="text-gray-600 text-sm">
                You typed: <strong>{email}</strong> / <strong>{password}</strong>
            </div>
        </form>
    );
}
