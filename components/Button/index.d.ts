import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

export const ButtonVariants = ['primary', 'secondary', 'tertiary', 'link'] as const;
export const ButtonSizes = ['sm', 'md', 'lg'] as const;
export const ButtonTypes = ['button', 'submit', 'reset'] as const;

export interface ButtonProps {
    children?: React.ReactNode;
    className?: string;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'link';
    size?: 'sm' | 'md' | 'lg';
    error?: boolean;
    success?: boolean;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
    style?: React.CSSProperties;
}

interface ButtonComponent extends React.FC<ButtonProps> {
    /**
     * OneHaul Button component
     *
     * @example
     * ```jsx
     * <Button size="sm" variant="primary" onClick={handleClick}>
     *   Click me
     * </Button>
     * ```
     */
}

declare const Button: ButtonComponent;

export default Button;
