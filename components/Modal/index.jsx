import React from 'react';
import { Modal as AntModal } from 'antd';
import Button from '../Button';
import './Modal.css';
import Text from '../Text';
import { Fail } from '@/icons';

const DEFAULT_ICON_SIZE = 12;

function LabelComponent({ children, className = '', textProps = {} }) {
    if (typeof children === 'string') {
        return (
            <Text {...textProps} className={className}>
                {children}
            </Text>
        );
    }
    return <div className={className}>{children}</div>;
}

const PLACEMENT_MAPPING = {
    center: 'center',
    top: 'top',
    bottom: 'bottom',
    left: 'left',
    right: 'right',
    fullscreen: 'fullscreen',
};

const Modal = ({
    children,
    className = '',
    closeIcon = <Fail />,
    placement = 'center',
    closable = false,
    icon: HeaderIcon = null,
    ...props
}) => {
    const customProps = { ...props };

    if (!props.footer && props.footer === undefined) {
        customProps.footer = (
            <>
                <Button
                    onClick={props.onCancel}
                    variant="secondary"
                    {...(props.cancelButtonProps || {})}
                >
                    {props.cancelText || 'Cancel'}
                </Button>

                <Button variant="primary" onClick={props.onOk} {...(props.okButtonProps || {})}>
                    {props.okText || 'OK'}
                </Button>
            </>
        );
    }

    if (props.title) {
        const modalTitle = (
            <div className="onehaul-modal-header">
                {HeaderIcon ? (
                    <div className="onehaul-modal-header-icon-container">
                        {React.cloneElement(HeaderIcon, {
                            width: DEFAULT_ICON_SIZE,
                            height: DEFAULT_ICON_SIZE,
                            ...(HeaderIcon.props || {}),
                        })}
                    </div>
                ) : null}

                {props.title ? (
                    <div className="onehaul-modal-header-content">
                        <LabelComponent
                            className="onehaul-modal-title"
                            textProps={{
                                size: 'sm',
                                variant: 'heading',
                                weight: 'medium',
                                ...(props.titleProps || {}),
                            }}
                        >
                            {props.title}
                        </LabelComponent>

                        {props.subtitle ? (
                            <LabelComponent
                                className="onehaul-modal-subtitle"
                                textProps={{ size: 'sm', ...(props.subtitleProps || {}) }}
                            >
                                {props.subtitle}
                            </LabelComponent>
                        ) : null}
                    </div>
                ) : null}
            </div>
        );

        customProps.title = modalTitle;
    }

    const classes = ['onehaul-modal', className, `onehaul-modal-${PLACEMENT_MAPPING[placement]}`]
        .filter(Boolean)
        .join(' ');

    return (
        <AntModal
            className={classes}
            keyboard
            closeIcon={closable ? closeIcon : null}
            {...customProps}
        >
            <div className="onehaul-modal-content">
                {typeof children === 'string' ? <Text>{children}</Text> : children}
            </div>
        </AntModal>
    );
};

Modal.Destructive = ({ okButtonProps, titleProps, ...restProps }) => {
    return (
        <Modal
            {...restProps}
            titleProps={{ type: 'danger', ...(titleProps || {}) }}
            okButtonProps={{ error: true, ...(okButtonProps || {}) }}
        />
    );
};

export default Modal;
