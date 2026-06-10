import React, { useState } from 'react';
import Pagination from './index';

export default {
    title: 'Components/Pagination',
    component: Pagination,
    tags: ['autodocs'],
    argTypes: {
        current: {
            control: 'number',
            description: 'Current page number',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '1' },
            },
        },
        pageSize: {
            control: 'number',
            description: 'Number of items per page',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '10' },
            },
        },
        total: {
            control: 'number',
            description: 'Total number of items',
            table: { type: { summary: 'number' } },
        },
        showSizeChanger: {
            control: 'boolean',
            description: 'Whether to show the page size changer',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        showQuickJumper: {
            control: 'boolean',
            description: 'Whether to show quick jumper',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        className: {
            control: 'text',
            description: 'The class name of the pagination',
            table: { type: { summary: 'string' } },
        },
    },
};

const Template = (args) => {
    const [page, setPage] = useState(args.current || 1);
    const [pageSize, setPageSize] = useState(args.pageSize || 10);

    const handleChange = (newPage, newPageSize) => {
        setPage(newPage);
        setPageSize(newPageSize);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Pagination {...args} current={page} pageSize={pageSize} onChange={handleChange} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    current: 1,
    pageSize: 10,
    total: 50,
};

export const WithQuickJumper = Template.bind({});
WithQuickJumper.args = {
    current: 1,
    pageSize: 10,
    total: 500,
    showQuickJumper: true,
};

export const WithoutSizeChanger = Template.bind({});
WithoutSizeChanger.args = {
    current: 1,
    pageSize: 20,
    total: 100,
    showSizeChanger: false,
};

export const SimplePagination = Template.bind({});
SimplePagination.args = {
    current: 1,
    pageSize: 10,
    total: 50,
    showSizeChanger: false,
    simple: true,
};
