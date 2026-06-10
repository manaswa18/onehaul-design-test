import React from 'react';
import { AvatarProps as AntAvatarProps, AvatarGroupProps as AntAvatarGroupProps } from 'antd';

export interface AvatarProps extends Omit<AntAvatarProps, 'className'> {
    children?: React.ReactNode;
    className?: string;
    size?: number | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    shape?: 'circle' | 'square';
    src?: string;
    srcSet?: string;
    alt?: string;
    icon?: React.ReactNode;
}

export interface AvatarGroupProps extends Omit<AntAvatarGroupProps, 'className'> {
    children?: React.ReactNode;
    className?: string;
    maxCount?: number;
    maxPopoverPlacement?: 'top' | 'bottom';
    maxPopoverTrigger?: 'hover' | 'focus' | 'click';
    maxStyle?: React.CSSProperties;
    size?: number | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

interface AvatarComponent extends React.FC<AvatarProps> {
    /**
     * OneHaul Avatar component
     *
     * @example
     * ```jsx
     * <Avatar src="https://example.com/avatar.jpg" />
     * <Avatar icon={<UserOutlined />} />
     * <Avatar>U</Avatar>
     * ```
     */
    Group: React.FC<AvatarGroupProps>;
}

declare const Avatar: AvatarComponent;
export default Avatar;
