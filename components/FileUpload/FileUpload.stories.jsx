import React from 'react';
import FileUpload from './index';

export default {
    title: 'Components/FileUpload',
    component: FileUpload,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
    },
    argTypes: {
        fileList: {
            control: 'object',
            description: 'The list of uploaded files.',
            table: {
                type: { summary: 'array' },
                defaultValue: { summary: [] },
            },
        },
        onChange: {
            action: 'onChange',
            description: 'The function to call when the file list changes.',
            table: {
                type: { summary: 'function' },
                defaultValue: { summary: '({fileList: [], file: {}}) => {}' },
            },
        },
        variant: {
            control: 'select',
            options: ['default', 'button'],
            description: 'The variant of the file upload component.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' },
            },
        },
        listType: {
            control: 'select',
            options: ['text', 'picture', 'picture-card', 'picture-circle'],
            description: 'The type of the file upload component.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'text' },
            },
        },
        accept: {
            control: 'text',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
            description: 'The accepted file types.',
        },
        maxSize: {
            control: 'number',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 10 },
            },
            description: 'The maximum file size.',
        },
        maxCount: {
            control: 'number',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 1 },
            },
            description: 'The maximum number of files.',
        },
        multiple: {
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            description: 'Whether to allow multiple file uploads.',
        },
        disabled: {
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            description: 'Whether the file upload component is disabled.',
        },
        error: {
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            description: 'Whether the file upload component is in error state.',
        },
        showUploadList: {
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: true },
            },
            description: 'Whether to show the upload list.',
        },
        placeholder: {
            control: 'text',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Click or drag file to this area to upload' },
            },
            description: 'The placeholder text.',
        },
        description: {
            control: 'text',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Support for a single or bulk upload.' },
            },
            description: 'The description text.',
        },
        buttonProps: {
            control: 'object',
            description: 'The props for the button of button variant of the file upload component.',
            table: {
                type: { summary: 'object' },
                defaultValue: {
                    summary: '{}',
                },
            },
        },
        uploadIcon: {
            control: 'text',
            description: 'The icon for the upload button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Upload' },
            },
        },
    },
};

const Template = (args) => <FileUpload {...args} />;

export const Default = Template.bind({});

Default.args = {
    placeholder: 'Click or drag file to this area to upload',
    description: 'Support for a single or bulk upload.',
};

export const Button = Template.bind({});
Button.args = {
    variant: 'button',
    placeholder: 'Upload File',
};

export const Multiple = Template.bind({});
Multiple.args = {
    multiple: true,
    maxCount: 5,
    placeholder: 'Click or drag files to this area to upload',
    description: 'Support for multiple file upload (max 5 files).',
};

export const WithFileTypeRestriction = Template.bind({});
WithFileTypeRestriction.args = {
    accept: '.pdf,.doc,.docx',
    placeholder: 'Upload Document',
    description: 'Only PDF and Word documents are allowed.',
};

export const ImageUpload = Template.bind({});
ImageUpload.args = {
    listType: 'picture-card',
    accept: 'image/*',
    placeholder: 'Upload Image',
    description: 'Click or drag image to upload.',
};

export const WithError = Template.bind({});
WithError.args = {
    error: true,
    placeholder: 'Click or drag file to this area to upload',
    description: 'Upload failed. Please try again.',
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    placeholder: 'Upload is disabled',
    description: 'Upload functionality is currently disabled.',
};

export const WithCustomContent = Template.bind({});
WithCustomContent.args = {
    children: (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>📁</div>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Custom Upload Area</div>
            <div style={{ color: '#666' }}>Drag and drop your files here or click to browse</div>
        </div>
    ),
};

export const ButtonSizes = () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <FileUpload
            variant="button"
            size="sm"
            placeholder="Small"
            showUploadList={false}
            buttonProps={{ size: 'sm' }}
        />
        <FileUpload
            variant="button"
            size="md"
            placeholder="Medium"
            showUploadList={false}
            buttonProps={{ size: 'md' }}
        />
        <FileUpload
            variant="button"
            size="lg"
            placeholder="Large"
            showUploadList={false}
            buttonProps={{ size: 'lg' }}
        />
    </div>
);

export const AllVariants = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
            <h3>Default Variant</h3>
            <FileUpload
                variant="default"
                placeholder="Drag and drop files here"
                description="Or click to browse"
            />
        </div>
        <div>
            <h3>Button Variant</h3>
            <FileUpload variant="button" placeholder="Choose Files" />
        </div>
    </div>
);

export const WithHelperText = Template.bind({});
WithHelperText.args = {
    helperText: 'Supported file types: .pdf, .doc, .docx',
};
