import React from 'react';
import Avatar from './index';
import { Adduser, Home } from '@/icons';

export default {
    title: 'Components/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    argTypes: {
        className: {
            control: 'text',
            description: 'Class name of the avatar',
            table: {
                type: { summary: 'string' },
            },
        },
        size: {
            options: ['sm', 'md', 'lg', 'xl', 'xxl'],
            control: { type: 'select' },
            description: 'Size of the avatar',
            table: {
                type: { summary: 'number | string' },
                defaultValue: { summary: 'md' },
            },
        },
        shape: {
            options: ['circle', 'square'],
            control: { type: 'select' },
            description: 'Shape of the avatar',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'circle' },
            },
        },
        src: {
            control: 'text',
            description: 'Image source for the avatar',
            table: {
                type: { summary: 'string' },
            },
        },
        alt: {
            control: 'text',
            description: 'Alt text for the avatar image',
            table: {
                type: { summary: 'string' },
            },
        },
        icon: {
            control: false,
            description: 'Icon to display in avatar',
            table: {
                type: { summary: 'ReactNode' },
            },
        },
        children: {
            control: 'text',
            description: 'Text content of the avatar',
            table: {
                type: { summary: 'ReactNode' },
            },
        },
    },
};

const Template = (args) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: 'U',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    icon: <Adduser />,
};

export const WithImage = Template.bind({});
WithImage.args = {
    src: 'https://xsgames.co/randomusers/avatar.php?g=pixel&key=1',
    alt: 'User Avatar',
};

export const Large = Template.bind({});
Large.args = {
    size: 'lg',
    children: 'L',
};

export const Small = Template.bind({});
Small.args = {
    size: 'sm',
    children: 'S',
};

export const Square = Template.bind({});
Square.args = {
    shape: 'square',
    icon: <Home />,
};

export const CustomSize = Template.bind({});
CustomSize.args = {
    size: 80,
    children: 'XL',
};

const GroupTemplate = (args) => (
    <Avatar.Group {...args}>
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
        <Avatar style={{ backgroundColor: '#7265e6' }} icon={<Adduser />} />
        <Avatar style={{ backgroundColor: '#00a2ae' }} icon={<Adduser />} />
    </Avatar.Group>
);

export const AvatarGroup = GroupTemplate.bind({});
AvatarGroup.args = {};

export const AvatarGroupWithMaxCount = GroupTemplate.bind({});
AvatarGroupWithMaxCount.args = {
    maxCount: 2,
    maxStyle: { color: '#f56a00', backgroundColor: '#fde3cf' },
};

const GroupWithMoreAvatarsTemplate = (args) => (
    <Avatar.Group {...args}>
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=4" />
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=5" />
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=6" />
    </Avatar.Group>
);

export const AvatarGroupLarge = GroupWithMoreAvatarsTemplate.bind({});
AvatarGroupLarge.args = {
    maxCount: 3,
    size: 'lg',
};
