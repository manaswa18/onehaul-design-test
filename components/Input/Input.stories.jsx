import React from 'react';
import Input from './index';

import { UserOutlined, LockOutlined, NumberOutlined, PhoneOutlined } from '@ant-design/icons';
import SvgHome from '../../icons/Home';
import SvgSearch from '../../icons/Search';

export default {
    title: 'Components/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        placeholder: {
            control: 'text',
            description: 'Input placeholder/label text (acts as title for OTP inputs)',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the input is disabled',
        },
        prefix: {
            control: false,
            description: 'Prefix icon or text',
        },
        suffix: {
            control: false,
            description: 'Suffix icon or text',
        },
        helperText: {
            control: 'text',
            description: 'Associated text below the input',
        },
        showCount: {
            control: 'boolean',
            description: 'Show character count below the input',
        },
        maxLength: {
            control: { type: 'number' },
            description: 'Maximum length of the input',
        },
        size: {
            options: ['lg', 'md'],
            control: { type: 'select' },
            description: 'Size of the input box',
        },
        variant: {
            options: ['primary', 'secondary'],
            control: { type: 'select' },
            description: 'Input type',
        },
        type: {
            options: ['text', 'password', 'number', 'email', 'tel', 'url', 'textarea', 'otp'],
            control: { type: 'select' },
            description: 'Input type',
        },
        error: {
            options: [true, false],
            control: { type: 'boolean' },
            value: false,
            description: 'Error message',
        },
        showErrorIcon: {
            control: 'boolean',
            defaultValue: true,
            description: 'Whether to show error icon when in error state',
        },
        addonBefore: {
            control: false,
            description: 'The addon content before the input field',
        },
        addonAfter: {
            control: false,
            description: 'The addon content after the input field',
        },
        rows: {
            control: { type: 'number' },
            description: 'Number of rows for textarea',
            defaultValue: 4,
        },
        floated: {
            control: 'boolean',
            description: 'Whether the input uses floating label mode',
        },
        otpLength: {
            control: { type: 'number' },
            description: 'Number of OTP input fields',
            defaultValue: 4,
        },
    },
};

export const Disabled = {
    args: {
        placeholder: 'Disabled input',
        disabled: true,
    },
};

export const WithValue = {
    args: {
        placeholder: 'Email address',
        value: 'example@email.com',
    },
};

export const WithPrefixIcon = {
    args: {
        placeholder: 'Search...',
        prefix: <SvgSearch />,
        size: 'md',
        helperText: '',
    },
};

export const WithSuffixText = {
    args: {
        placeholder: 'Weight',
        suffix: 'kg',
        helperText: 'This is Required',
        showCount: true,
        maxLength: 50,
        disabled: false,
        type: 'primary',
    },
};

export const WithPrefixAndSuffix = {
    args: {
        placeholder: 'Level',
        prefix: <UserOutlined />,
        suffix: <NumberOutlined />,
        helperText: 'Assistive text',
        showCount: true,
        maxLength: 50,
        disabled: false,
    },
};

export const WithHelperText = {
    args: {
        placeholder: 'Description',
        helperText: 'Assistive text',
    },
};

export const WithCount = {
    args: {
        placeholder: 'Type something...',
        showCount: true,
        maxLength: 50,
    },
};

export const WithError = {
    args: {
        placeholder: 'Error',
        error: true,
        helperText: 'This field is required',
        disabled: false,
    },
};

export const WithErrorNoIcon = {
    args: {
        placeholder: 'Error without icon',
        error: true,
        showErrorIcon: false,
        helperText: 'This field has an error but no icon',
    },
};

export const PasswordInput = {
    args: {
        type: 'password',
        placeholder: 'Enter password',
        prefix: <LockOutlined />,
        helperText: 'Password must be at least 8 characters',
    },
};

export const OTPInput = {
    args: {
        type: 'otp',
        placeholder: 'Verification Code',
        helperText: 'Enter the 6-digit code sent to your phone',
        otpLength: 6,
    },
};

export const ShorterOTPInput = {
    args: {
        type: 'otp',
        placeholder: 'Email Verification',
        helperText: 'Enter the 4-digit code sent to your email',
        otpLength: 4,
    },
};

export const FiveDigitOTP = {
    args: {
        type: 'otp',
        placeholder: 'Transaction PIN',
        helperText: 'Enter your 5-digit transaction PIN',
        otpLength: 5,
    },
};

export const TextareaInput = {
    args: {
        type: 'textarea',
        placeholder: 'Enter your message',
        helperText: 'Maximum 200 characters',
        showCount: true,
        maxLength: 200,
        rows: 10,
    },
};

export const WithAddonBefore = {
    args: {
        placeholder: 'Enter website',
        addonBefore: 'https://',
        helperText: 'Enter your website URL',
    },
};

export const WithAddonAfter = {
    args: {
        placeholder: 'Username',
        addonAfter: '@onehaul.com',
        helperText: 'Enter your username',
    },
};

export const WithAddonBeforeAndAfter = {
    args: {
        placeholder: 'Amount',
        addonBefore: '$',
        addonAfter: 'USD',
        type: 'number',
        prefix: <SvgHome />,
        suffix: <SvgHome />,
        helperText: 'Enter amount in dollars',
    },
};

export const PhoneInput = {
    args: {
        placeholder: 'Phone number',
        prefix: <PhoneOutlined />,
        addonBefore: '+91',
        type: 'tel',
        helperText: 'Enter your phone number',
    },
};

export const RegularPlaceholder = {
    args: {
        placeholder: 'Regular placeholder (non-floating)',
        floated: false,
        helperText: 'Uses standard placeholder behavior',
    },
};

export const FloatingLabel = {
    args: {
        placeholder: 'Floating label',
        floated: true,
        helperText: 'Label floats when focused or has value',
    },
};

export const FloatingLabelWithAddons = {
    args: {
        placeholder: 'Website URL',
        addonBefore: 'https://',
        addonAfter: '.com',
        floated: true,
        helperText: 'Enter your website URL',
    },
};

export const RegularPlaceholderWithAddons = {
    args: {
        placeholder: 'Enter website name',
        addonBefore: 'https://',
        addonAfter: '.com',
        floated: false,
        helperText: 'With standard placeholder and addons',
    },
};

export const WithAddonBeforeOnly = {
    args: {
        placeholder: 'Enter website',
        addonBefore: 'https://',
        helperText: 'Border radius on the right side only',
    },
};

export const WithAddonAfterOnly = {
    args: {
        placeholder: 'Username',
        addonAfter: '@onehaul.com',
        helperText: 'Border radius on the left side only',
    },
};

// Add this example to Input.stories.jsx
export const InputWithRef = () => {
    const inputRef = React.useRef(null);

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const getValue = () => {
        if (inputRef.current) {
            alert(`Current value: ${inputRef.current.input.value}`);
        }
    };

    return (
        <div>
            <Input
                floated={false}
                suffix={<SvgSearch />}
                ref={inputRef}
                placeholder="Input with external ref"
            />
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={focusInput} style={{ marginRight: '10px' }}>
                    Focus Input
                </button>
                <button onClick={getValue}>Get Value</button>
            </div>
        </div>
    );
};
