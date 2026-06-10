import React from 'react';
import { Typography as AntdTypography, theme } from 'antd';
import Tooltip from '../Tooltip';
const { Title, Text: AntdText, Paragraph, Link } = AntdTypography;

const wrapperComponent = ({ children, component, condition }) =>
    condition ? component(children) : children;

const FONT_WEIGHT_MAP = {
    regular: 400,
    medium: 500,
    semibold: 600,
};

const FONT_MAP = (token) => ({
    display: {
        size: {
            lg: 32, // 32px
            md: 32, // 32px
            sm: 32, // 32px
        },
        weight: {
            regular: FONT_WEIGHT_MAP.regular,
            medium: FONT_WEIGHT_MAP.medium,
            semibold: FONT_WEIGHT_MAP.semibold,
        },
        style: {
            margin: 0,
            padding: 0,
        },
        component: Title,
    }, // 32px custom size

    heading: {
        size: {
            lg: 24, // 24px
            md: 20, // 20px
            sm: 18, // 18px
        },
        weight: {
            regular: FONT_WEIGHT_MAP.regular,
            medium: FONT_WEIGHT_MAP.medium,
            semibold: token.fontWeightStrong,
        },
        style: {
            margin: 0,
            padding: 0,
        },
        component: Title, // 18px custom, 400
    },
    body: {
        size: {
            lg: 16, // 16px
            md: 14, // 14px
            sm: 12, // 12px
        },
        weight: {
            regular: FONT_WEIGHT_MAP.regular,
            medium: FONT_WEIGHT_MAP.medium,
            semibold: FONT_WEIGHT_MAP.semibold,
        },
        style: {
            margin: 0,
            padding: 0,
        },

        component: Paragraph,
    }, // 14px token, 400
    caption: {
        size: {
            lg: 10, // 10px
            md: 10, // 10px
            sm: 10, // 10px
        },
        weight: {
            regular: FONT_WEIGHT_MAP.regular,
            medium: FONT_WEIGHT_MAP.medium,
            semibold: FONT_WEIGHT_MAP.semibold,
        },
        style: { lineHeight: 1.4 },
        component: AntdText,
    },
    OVERLINE: {
        size: {
            lg: 14, // 14px
            md: 12, // 12px
            sm: 10, // 10px
        },
        weight: {
            regular: FONT_WEIGHT_MAP.regular,
            medium: FONT_WEIGHT_MAP.regular,
            semibold: FONT_WEIGHT_MAP.regular,
        },
        style: {
            textTransform: 'uppercase',
        },
        component: AntdText,
    },
    link: {
        size: {
            large: 14, // 14px
            medium: 12, // 12px
            small: 10, // 10px
        },
        weight: {
            regular: FONT_WEIGHT_MAP.regular,
            medium: FONT_WEIGHT_MAP.medium,
            semibold: FONT_WEIGHT_MAP.semibold,
        },
        component: Link,
    }, // 10px custom, 400
});

const Text = ({
    variant = 'body', // "heading", "body", "text", "link"
    size = 'medium', // "large", "medium", "small".
    weight = 'regular', //  "regular", "medium", "semibold"
    className = '',
    level = '',
    style = {},
    children,
    tooltipProps = {},
    ...props
}) => {
    const { token } = theme.useToken();

    const textRef = React.useRef(null);

    const [isOverflowing, setIsOverflowing] = React.useState(false);

    const COMPONENT_MAP = FONT_MAP(token)?.[variant];
    const Component = COMPONENT_MAP?.component || AntdText;

    let initialFontSize =
        variant === 'display'
            ? 32
            : variant === 'heading'
            ? 20
            : variant === 'body'
            ? 14
            : variant === 'caption'
            ? 10
            : 14;

    let initialFontWeight =
        variant === 'display'
            ? token.fontWeightStrong
            : variant === 'heading'
            ? token.fontWeightStrong
            : 400;

    const fontSize = COMPONENT_MAP?.size?.[size] || initialFontSize;
    const fontWeight = COMPONENT_MAP?.weight?.[weight] || initialFontWeight;
    const customStyle = COMPONENT_MAP?.style || null;

    const componentLevel =
        variant === 'display'
            ? 1
            : variant === 'heading'
            ? size === 'lg'
                ? 2
                : size === 'md'
                ? 3
                : 4
            : undefined;

    const isOverrideLevel =
        level !== undefined && [1, 2, 3, 4, 5].includes(Number(level)) && variant == 'heading';

    const levelToUse = isOverrideLevel ? level : componentLevel;

    React.useEffect(() => {
        const checkOverflow = () => {
            if (textRef.current) {
                const element = textRef.current;

                setIsOverflowing(
                    element.scrollWidth > element.clientWidth ||
                        element.scrollHeight > element.clientHeight
                );
            }
        };

        checkOverflow();

        const resizeObserver = new ResizeObserver(checkOverflow);

        if (textRef.current) {
            resizeObserver.observe(textRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [children]);

    return wrapperComponent({
        children: (
            <Component
                ref={textRef}
                level={levelToUse}
                style={{ fontSize, fontWeight, ...customStyle, ...style }}
                {...props}
                className={`onehaul-text ${className}`}
            >
                {children}
            </Component>
        ),
        component: (children) => {
            return (
                <Tooltip
                    title={React.cloneElement(children, {
                        ...(children?.props || {}),
                        ellipsis: false,
                        style: {
                            ...children?.props?.style,
                            maxWidth: 330,
                            width: '100%',
                            color: 'var(--theme-color-grey-100)',
                            fontWeight: 400,
                            fontSize: 14,
                        },
                    })}
                    {...(tooltipProps || {})}
                >
                    {children}
                </Tooltip>
            );
        },
        condition: isOverflowing && (props.ellipsis || tooltipProps?.title),
    });
};

export default Text;
