import React from 'react';
import Breadcrumb from './index';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

export default {
    title: 'Components/Breadcrumb',
    component: Breadcrumb,
    tags: ['autodocs'],
    argTypes: {
        className: {
            control: 'text',
            description: 'Class name of the breadcrumb',
            table: {
                type: { summary: 'string' },
            },
        },
        separator: {
            control: 'text',
            description: 'Custom separator',
            table: {
                type: { summary: 'ReactNode' },
                defaultValue: { summary: '/' },
            },
        },
        items: {
            control: 'object',
            description: 'The breadcrumb items config',
            table: {
                type: { summary: 'Array<{title, path, menu, ...}>' },
            },
        },
    },
};

const Template = (args) => <Breadcrumb {...args} />;

export const Default = Template.bind({});
Default.args = {
    items: [
        { title: 'Home' },
        { title: 'Application Center' },
        { title: 'Application List' },
        { title: 'An Application' },
    ],
};

const IconsTemplate = (args) => (
    <Breadcrumb {...args}>
        <Breadcrumb.Item href="/">
            <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/user">
            <UserOutlined />
            <span>User Center</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Application List</Breadcrumb.Item>
        <Breadcrumb.Item>Application</Breadcrumb.Item>
    </Breadcrumb>
);

export const WithIcons = IconsTemplate.bind({});

export const WithCustomSeparator = Template.bind({});
WithCustomSeparator.args = {
    separator: '>',
    items: [
        {
            title: 'Home',
        },
        {
            title: 'Application Center',
        },
        {
            title: 'Application List',
        },
        {
            title: 'An Application',
        },
    ],
};
