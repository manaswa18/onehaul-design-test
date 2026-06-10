import React from 'react';

export interface Theme {
    [key: string]: any;
}

export interface ThemeProviderProps {
    children: React.ReactNode;
    colors?: Record<string, string>;
}

export declare const ThemeProvider: React.FC<ThemeProviderProps>;
export declare const useTheme: () => Theme;
export declare const defaultTheme: Theme;
export declare const getCurrentTheme: () => Theme;
