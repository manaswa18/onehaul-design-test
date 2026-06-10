import React from "react";

export interface InputProps {
  placeholder?: string;
  className?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  helperText?: string;
  showCount?: boolean;
  maxLength?: number;
  error?: boolean;
  showErrorIcon?: boolean;
  size?: "md" | "lg";
  variant?: "primary" | "secondary";
  style?: React.CSSProperties;
  disabled?: boolean;
  type?:
    | "text"
    | "password"
    | "textarea"
    | "otp"
    | "email"
    | "number"
    | "tel"
    | "url";
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  rows?: number;
  floated?: boolean;
  otpLength?: number;
  otpTitle?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFocus?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value?: string;
  defaultValue?: string;
}

interface InputComponent extends React.FC<InputProps> {
  /**
   * OneHaul Input component
   *
   * @example
   * ```jsx
   * <Input
   *   size="lg"
   *   variant="primary"
   *   placeholder="Enter text"
   *   onChange={handleChange}
   * />
   * ```
   */
}

declare const Input: InputComponent;
export default Input;
