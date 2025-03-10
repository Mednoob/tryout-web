import { ReactNode } from "react";

export function OutlinedButton({ color, type, children, onClick, disabled, className }: { color: "danger" | "normal" | "warn", type?: "button" | "submit" | "reset"; children: ReactNode, onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; disabled?: boolean; className?: string }) {
    return (
        <button type={type} onClick={onClick} disabled={disabled} className={`px-4 py-0.5 rounded-md border duration-200 ${color === "danger" ? "text-red-500 disabled:text-red-300" : color === "normal" ? "text-black disabled:text-gray-400" : "text-yellow-500 disabled:text-yellow-300"} ${color === "danger" ? "not-disabled:hover:bg-red-500" : color === "normal" ? "not-disabled:hover:bg-black" : "not-disabled:hover:bg-yellow-500"} not-disabled:cursor-pointer hover:text-white transition-colors ${className}`}>
            {children}
        </button>
    );
}

export function BoxButton({ color, type, children, onClick, disabled, className }: { color: "danger" | "normal" | "warn", type?: "button" | "submit" | "reset"; children: ReactNode, onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; disabled?: boolean; className?: string }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-7 py-0.5 border h-min bg-white duration-200 ${color === "danger" ? "text-red-500 disabled:text-red-300" : color === "normal" ? "text-black disabled:text-gray-400" : "text-yellow-500 disabled:text-yellow-300"} ${color === "danger" ? "not-disabled:hover:bg-red-500" : color === "normal" ? "not-disabled:hover:bg-black" : "not-disabled:hover:bg-yellow-500"} not-disabled:cursor-pointer hover:text-white transition-colors ${className}`}>
            {children}
        </button>
    );
}
