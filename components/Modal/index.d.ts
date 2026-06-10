import React from 'react';
import { ButtonProps } from '../Button';
import { TextProps } from '../Text';

export interface ModalProps {
    open?: boolean;
    onCancel?: (e: React.MouseEvent) => void;
    onOk?: (e: React.MouseEvent) => void;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    width?: string | number;
    centered?: boolean;
    closable?: boolean;
    maskClosable?: boolean;
    confirmLoading?: boolean;
    destroyOnClose?: boolean;
    okText?: React.ReactNode;
    cancelText?: React.ReactNode;
    okType?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
    cancelButtonProps?: ButtonProps;
    okButtonProps?: ButtonProps;
    className?: string;
    wrapClassName?: string;
    bodyStyle?: React.CSSProperties;
    maskStyle?: React.CSSProperties;
    footer?: React.ReactNode;
    children?: React.ReactNode;
    placement?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'fullscreen';
    titleProps?: TextProps;
    subtitleProps?: TextProps;
}

export interface DestructiveModalProps extends ModalProps {}

interface ModalComponent extends React.FC<ModalProps> {
    /**
     * OneHaul Modal component
     *
     * @example
     * ```jsx
     * <Modal
     *   open={visible}
     *   onCancel={handleCancel}
     *   onOk={handleOk}
     *   title="Modal Title"
     * >
     *   Modal content
     * </Modal>
     * ```
     */
    Destructive: React.FC<DestructiveModalProps>;
}

declare const Modal: ModalComponent;
export default Modal;
