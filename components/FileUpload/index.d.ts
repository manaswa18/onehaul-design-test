import React from 'react';
import type { ButtonProps } from '../Button';

export type FileUploadVariant = 'default' | 'button';
export type FileUploadListType = 'text' | 'picture' | 'picture-card' | 'picture-circle';

export interface FileUploadProps {
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    listType?: FileUploadListType;
    fileList?: any[];
    defaultFileList?: any[];
    onChange?: (info: any) => void;
    onPreview?: (file: any) => void;
    onRemove?: (file: any) => boolean | void | Promise<boolean | void>;
    beforeUpload?: (file: any, fileList: any[]) => boolean | Promise<boolean>;
    customRequest?: (options: any) => void;
    data?: object | ((file: any) => object);
    headers?: object;
    name?: string;
    action?: string;
    method?: 'post' | 'put' | 'patch';
    showUploadList?: boolean | object;
    maxCount?: number;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    variant?: FileUploadVariant;
    maxSize?: number;
    error?: boolean;
    placeholder?: string;
    description?: string;
    buttonProps?: ButtonProps;
    uploadIcon?: React.ReactNode;
}

interface FileUploadComponent extends React.FC<FileUploadProps> {
    /**
     * OneHaul FileUpload component
     *
     * @example
     * ```jsx
     * <FileUpload
     *   accept="image/*"
     *   listType="picture-card"
     *   onChange={handleChange}
     * >
     *   <Button>Upload</Button>
     * </FileUpload>
     * ```
     */
}

declare const FileUpload: FileUploadComponent;
export default FileUpload;
