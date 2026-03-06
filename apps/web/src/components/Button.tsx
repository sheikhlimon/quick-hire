type ButtonVariant = "primary" | "outline" | "secondary";

interface ButtonProps {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles = "rounded-md px-6 py-2 font-medium transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-indigo-500 text-white hover:bg-indigo-600",
    outline: "border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-50",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
    >
      {children}
    </button>
  );
}
