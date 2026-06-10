import React from 'react';

export interface PlaceholderProps {
    active?: boolean;
    loading?: boolean;
    children?: React.ReactNode;
    title?: boolean | React.ReactNode;
    paragraph?:
        | boolean
        | {
              rows?: number;
              width?: number | string | Array<number | string>;
          };
    avatar?:
        | boolean
        | {
              size?: 'large' | 'small' | 'default';
              shape?: 'circle' | 'square';
          };
    round?: boolean;
    className?: string;
    style?: React.CSSProperties;
    size?: 'sm' | 'md' | 'lg';
    width?: number | string;
}

interface PlaceholderComponent extends React.FC<PlaceholderProps> {
    /**
     * OneHaul Placeholder component
     *
     * @example
     * ```jsx
     * <Placeholder
     *   active={loading}
     *   title={false}
     *   paragraph={{ rows: 4 }}
     * >
     *   <div>Your content here</div>
     * </Placeholder>
     * ```
     */
    Paragraph: React.FC<PlaceholderProps>;
    Button: React.FC<PlaceholderProps>;
    Avatar: React.FC<PlaceholderProps>;
    Input: React.FC<PlaceholderProps>;
    Image: React.FC<PlaceholderProps>;
}

declare const Placeholder: PlaceholderComponent;
export default Placeholder;
