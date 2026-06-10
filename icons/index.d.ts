import React from 'react';

interface IconProps {
    className?: string;
    style?: React.CSSProperties;
    size?: number | string;
    color?: string;
    onClick?: (event: React.MouseEvent<SVGSVGElement>) => void;
    width?: number | string;
    height?: number | string;
}

export const Chevrondown: React.FC<IconProps>;
export const Tick: React.FC<IconProps>;
export const Fail: React.FC<IconProps>;
export const Success: React.FC<IconProps>;
export const Search: React.FC<IconProps>;
export const Add: React.FC<IconProps>;
export const EditPencil: React.FC<IconProps>;
export const Building: React.FC<IconProps>;
export const InfoCircle: React.FC<IconProps>;
export const Delete: React.FC<IconProps>;
export const Upload: React.FC<IconProps>;
export const Attachment: React.FC<IconProps>;
export const MoreVert: React.FC<IconProps>;
export const Phone: React.FC<IconProps>;
export const MailOutline: React.FC<IconProps>;
export const ChevronLeft: React.FC<IconProps>;
export const ChevronRight: React.FC<IconProps>;
export const DocIcon: React.FC<IconProps>;
export const ListIcon: React.FC<IconProps>;
export const HelpIcon: React.FC<IconProps>;
export const NotificationIcon: React.FC<IconProps>;
export const Link: React.FC<IconProps>;
export const Linkoff: React.FC<IconProps>;
