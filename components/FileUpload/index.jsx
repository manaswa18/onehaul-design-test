import React from 'react';
import { Upload as AntUpload } from 'antd';
import './FileUpload.css';
import Text from '../Text';
import Button from '../Button';
import { Delete, Upload, Attachment } from '@/icons';

const { Dragger } = AntUpload;

const ICON_SIZE_MAPPING = {
    sm: 14,
    md: 16,
    lg: 18,
};

const FileUpload = ({
    className = '',
    children,
    variant = 'default',
    accept,
    multiple = false,
    maxCount,
    maxSize = 10, // MB
    showUploadList = false,
    disabled = false,
    error = '',
    placeholder = 'Click or drag file to this area to upload',
    description = 'Drag & Drop files here or, click to Browse',
    uploadIcon: UploadIcon = Upload,
    listType = 'text',
    beforeUpload,
    onChange = () => {},
    onRemove = () => {},
    customRequest,
    buttonProps = {},
    helperText,
    value = [],
    loading,
    ...props
}) => {
    const handleBeforeUpload = (file) => {
        if (maxSize && file.size / 1024 / 1024 > maxSize) {
            return AntUpload.LIST_IGNORE;
        }
        if (beforeUpload) {
            return beforeUpload(file);
        }
        return true;
    };

    const handleChange = (info) => {
        let newFileList = [...info.fileList];
        onChange(newFileList);
    };

    const uploadProps = {
        ...props,
        name: 'file',
        multiple,
        maxCount,
        accept,
        listType,
        fileList: value,
        beforeUpload: handleBeforeUpload,
        onChange: handleChange,
        onRemove,
        customRequest,
        disabled,
        showUploadList,
    };

    const handleOpenFile = (fileUrl) => {
        window.open(fileUrl);
    };

    const wrapperClasses = [
        'onehaul-file-upload',
        `onehaul-file-upload-${variant}`,
        disabled ? 'onehaul-file-upload-disabled' : '',
        error ? 'onehaul-file-upload-error' : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const renderUploadContent = () => {
        if (children) return children;
        if (variant === 'default') {
            return (
                <div className="onehaul-file-upload-default-content">
                    {UploadIcon && (
                        <div className="onehaul-file-upload-icon">
                            <UploadIcon width={24} height={24} />
                        </div>
                    )}
                    <div className="onehaul-file-upload-content">
                        <Text
                            disabled={disabled}
                            className="onehaul-file-upload-placeholder"
                            size="md"
                        >
                            {placeholder}
                        </Text>
                        {description && (
                            <Text
                                disabled={disabled}
                                className="onehaul-file-upload-description"
                                variant="caption"
                                type="secondary"
                            >
                                {description}
                            </Text>
                        )}
                    </div>
                </div>
            );
        }
        if (variant === 'button') {
            const iconSize = ICON_SIZE_MAPPING[buttonProps?.size || 'md'];
            return (
                <Button
                    className="onehaul-file-upload-button-content"
                    variant="secondary"
                    {...buttonProps}
                    disabled={disabled || buttonProps?.disabled}
                >
                    <UploadIcon width={iconSize} height={iconSize} />
                    {placeholder || 'Upload File'}
                </Button>
            );
        }
        return null;
    };

    const UploadComponent = variant === 'default' ? Dragger : AntUpload;

    return (
        <div className={wrapperClasses}>
            <UploadComponent {...uploadProps}>{renderUploadContent()}</UploadComponent>
            {error && !helperText ? (
                <div className="onehaul-file-upload-error-message">{error}</div>
            ) : null}
            {helperText ? (
                <div
                    className={`onehaul-file-upload-helper-text ${
                        error ? 'onehaul-file-upload-error-message' : ''
                    }`}
                >
                    {error}
                    {helperText}
                </div>
            ) : null}
            {value.length ? (
                <div className="onehaul-file-upload-list">
                    {value.map((file) => (
                        <div className="onehaul-file-upload-item" key={file.name}>
                            <Attachment width={12} height={12} style={{ marginRight: 8 }} />
                            <Text
                                size="sm"
                                className="onehaul-file-upload-item-name"
                                ellipsis
                                onClick={() => handleOpenFile(file.finalUrl)}
                            >
                                {file.fileName}
                            </Text>
                            <Delete
                                width={12}
                                height={12}
                                onClick={() => onRemove(file.fileName)}
                                className="onehaul-file-upload-item-delete-icon"
                            />
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default FileUpload;
