import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`bg-white border border-gray-200 ${
        hover ? "hover:shadow-sm" : ""
      } transition-shadow ${className}`}
    >
      {children}
    </div>
  );
}
