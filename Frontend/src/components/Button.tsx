import type {ButtonHTMLAttributes} from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ onClick, children, type="button", ...props }: Props ) => (
    <button
        className="text-slate-600 hover:cursor-pointer font-semibold px-6 py-2 rounded-lg shadow transition border-2 hover:ring-1 hover:ring-gray-200 hover:border-2 hover:bg-slate-200"
        {...props}
    >
        {children}
    </button>
);

export default Button;