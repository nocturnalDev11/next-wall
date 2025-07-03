import { useEffect, useRef, ChangeEvent } from "react";

interface InputProps {
    type?: string;
    value: string;
    onChange: (value: string) => void;
    id?: string;
    required?: boolean;
    autoComplete?: string;
    className?: string;
    autoFocus?: boolean;
    placeholder?: string;
}

export default function Input({
    type = "text",
    value,
    onChange,
    id,
    required = false,
    autoComplete,
    className = "",
    autoFocus = false,
    placeholder,
}: InputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <input
            id={id}
            type={type}
            className={`${className} w-full py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none transition-all duration-200 placeholder-gray-400`}
            value={value}
            required={required}
            autoComplete={autoComplete}
            placeholder={placeholder}
            onChange={handleChange}
            ref={inputRef}
        />
    );
}
