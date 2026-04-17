import React from "react";
import {
  ButtonProps,
  ButtonSize,
  ButtonRadius,
  ButtonVariant,
} from "./Button.types";
 
export const Button: React.FC<ButtonProps> = ({
  variant,
  color,
  size = "md",
  radius = "lg",
  children,
  fullWidth = false,
  isLoading = false,
  spinnerPlacement = "start",
  startContent,
  endContent,
  disabled,
  className = "",
  disableOnLoading = false,
  type = "button",
  ...props
}) => {
  const activeVariant = variant || color || "primary";
 
  // Base styles
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 " +
    "outline-none focus:outline-none focus:ring-0 " +
    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sgx-blue " +
    "disabled:opacity-50 disabled:cursor-not-allowed";
 
  const sizeMap: Record<ButtonSize, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
 
  const radiusMap: Record<ButtonRadius, string> = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };
 
  const variantMap: Record<ButtonVariant, string> = {
    primary: "bg-sgx-blue hover:bg-[#061544] text-white",
    secondary: "bg-sgx-purple hover:bg-[#5a1556] text-white",
    danger: "bg-sgx-red hover:bg-[#8c003c] text-white",
    success: "bg-sgx-green hover:bg-[#05bf2a] text-sgx-blue",
    warning: "bg-[#FFCC00] hover:bg-[#e6b800] text-sgx-blue",
    lightblue: "bg-sgx-light-blue hover:bg-[#006b88] text-white",
    ghost:
      "bg-transparent border border-sgx-blue text-sgx-blue hover:bg-sgx-bg-blue",
    white:
      "bg-white text-sgx-dark-grey hover:bg-gray-100 border border-gray-200",
    outline:
      "bg-transparent border border-[rgba(95,96,98,0.15)] text-sgx-dark-grey " +
      "hover:border-sgx-light-blue hover:text-sgx-light-blue",
    neutral: "",
  };
 
  const classes = [
    base,
    sizeMap[size] ?? sizeMap.md,
    radiusMap[radius] ?? radiusMap.md,
    variantMap[activeVariant] ?? variantMap.primary,
    fullWidth ? "w-full" : "inline-block",
    isLoading ? "opacity-80 cursor-wait" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
 
  const spinner = (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
 
  const computedDisabled = disableOnLoading
    ? disabled || isLoading
    : disabled;
 
  return (
    <button
      type={type}
      className={classes}
      disabled={computedDisabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading && spinnerPlacement === "start" && spinner}
      {startContent && !isLoading && startContent}
 
      {children}
 
      {isLoading && spinnerPlacement === "end" && spinner}
      {endContent && !isLoading && endContent}
    </button>
  );
};
 
export default Button;