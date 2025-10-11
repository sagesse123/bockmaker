import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({ children, variant = "primary", ...props }) => {
  const base =
    "px-4 py-2 rounded-2xl font-semibold transition duration-200 focus:outline-none focus:ring-2";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-200";

  return (
    <button className={`${base} ${styles}`} {...props}>
      {children}
    </button>
  );
};

