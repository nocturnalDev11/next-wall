import { ReactNode } from "react";

interface CardProps {
    header?: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
}

export default function Card({ header, children, footer }: CardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            {header && (
                <div className="px-6 py-4 border-b border-gray-200 text-lg font-semibold text-gray-800">
                {header}
                </div>
            )}
            <div className="px-6 py-4 text-gray-700">
                {children}
            </div>
            {footer && (
                <div className="px-6 py-4 border-t border-gray-200 text-sm text-gray-600">
                {footer}
                </div>
            )}
        </div>
    );
}
