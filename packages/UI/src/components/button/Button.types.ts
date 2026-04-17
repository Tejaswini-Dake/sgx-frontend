import { ButtonHTMLAttributes, ReactNode } from "react";
 
export type ButtonSize = "sm" | "md" | "lg";
 
export type ButtonRadius = "sm" | "md" | "lg" | "full";
 
export type ButtonType = "button" | "submit" | "reset";
 
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "lightblue"
  | "ghost"
  | "white"
  | "outline"
  | "neutral";
 
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  fullWidth?: boolean;
  isLoading?: boolean;
  spinnerPlacement?: "start" | "end";
  startContent?: ReactNode;
  endContent?: ReactNode;
  disableOnLoading?: boolean;
  type?: ButtonType;
}
