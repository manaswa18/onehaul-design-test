'use client';

import '@ant-design/v5-patch-for-react-19';
import * as React from 'react';
import { ConfigProvider } from 'antd';
import { getTheme } from './getTheme';
import { defaultTheme } from './defaultTheme';

const { createContext, useContext, useMemo, useLayoutEffect, useState } = React;

const ThemeContext = createContext(undefined);

const setCSSCustomProperties = (colors) => {
    if (typeof window !== 'undefined' && colors) {
        const root = document.documentElement;
        for (const [key, value] of Object.entries(colors)) {
            if (value) {
                root.style.setProperty(`--theme-color-${key.replace(/_/g, '-')}`, value);
            }
        }
    }
};

if (typeof window !== 'undefined') {
    setCSSCustomProperties(defaultTheme.colors);
}

export const ThemeProvider = ({ children, colors }) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        const initialTheme = {
            ...defaultTheme,
            colors: {
                ...defaultTheme.colors,
                ...(colors || {}),
            },
        };

        if (typeof window !== 'undefined') {
            setCSSCustomProperties(initialTheme.colors);
        }

        return initialTheme;
    });

    useLayoutEffect(() => {
        setCSSCustomProperties(currentTheme.colors);
    }, [currentTheme.colors]);

    const setCustomTheme = (newCustomColors) => {
        setCurrentTheme((prevTheme) => {
            const newTheme = {
                ...prevTheme,
                colors: {
                    ...prevTheme.colors,
                    ...newCustomColors,
                },
            };

            setCSSCustomProperties(newTheme.colors);

            return newTheme;
        });
    };

    const contextValue = useMemo(
        () => ({
            currentTheme,
            setCustomTheme,
        }),
        [currentTheme]
    );

    return (
        <ThemeContext.Provider value={contextValue}>
            <ConfigProvider theme={getTheme(currentTheme)}>{children}</ConfigProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const getCurrentTheme = () => {
    const currentColors = {};

    if (typeof window !== 'undefined' && typeof getComputedStyle === 'function') {
        const rootStyles = getComputedStyle(document.documentElement);
        for (const key of Object.keys(defaultTheme.colors)) {
            const cssVarName = `--theme-color-${key.replace(/_/g, '-')}`;
            const valueFromCSS = rootStyles.getPropertyValue(cssVarName).trim();
            if (valueFromCSS) {
                currentColors[key] = valueFromCSS;
            } else {
                currentColors[key] = defaultTheme.colors[key];
            }
        }
    } else {
        return { ...defaultTheme };
    }

    return {
        ...defaultTheme,
        colors: currentColors,
    };
};
