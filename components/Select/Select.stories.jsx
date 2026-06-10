import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
    HomeOutlined,
    UserOutlined,
    SettingOutlined,
    SearchOutlined,
    LoadingOutlined,
    ApiOutlined,
    DatabaseOutlined,
    CloudOutlined,
    ThunderboltOutlined,
    HeartOutlined,
    StarOutlined,
    BellOutlined,
    MailOutlined,
    PhoneOutlined,
    GlobalOutlined,
    CameraOutlined,
    FileOutlined,
    EditOutlined,
    DeleteOutlined,
    TeamOutlined,
    BankOutlined,
    ShopOutlined,
    ToolOutlined,
    BookOutlined,
    CarOutlined,
    RocketOutlined,
    TrophyOutlined,
    BugOutlined,
    ExperimentOutlined,
    FireOutlined,
    GiftOutlined,
    ThunderboltFilled,
    HeartFilled,
    StarFilled,
} from '@ant-design/icons';
import Select from './index';
import { Tick, Home } from '@/icons';
// =============================================================================
// STORY CONFIGURATION
// =============================================================================

export default {
    title: 'Components/Select',
    component: Select,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
# OneHaul Select Component

A powerful, feature-rich select component with async data loading, intelligent caching, and modern UX patterns.

## Key Features

### 🔄 Async Data Loading
- **Search-based loading** with \`onSearchLoad\` - Load options dynamically as user types
- **Focus-triggered loading** with \`onFocusLoad\` - Load additional options when dropdown opens
- **Combined loading** - Use both search and focus loading together
- **Load on mount** - Automatically fetch data when component mounts

### 🧠 Intelligent Caching
- **Automatic caching** - Reduces API calls by up to 90%
- **Configurable expiration** - Set custom cache timeout (default: 5 minutes)
- **Shared caching** - Use custom cache keys to share data between components
- **Cache analytics** - Monitor cache hits/misses with callbacks

### 🎨 Visual Variants
- **Two sizes**: \`md\` (36px) and \`lg\` (48px)
- **Multiple modes**: Single selection or multiple with tags
- **Theme variants**: Primary and secondary styling
- **Flexible layouts**: Standard, center-aligned, icon-only modes

### 🔍 Smart Search & Filtering
- **Built-in search** with debounced input (300ms default)
- **Search threshold** - Minimum characters before triggering async search
- **Client-side filtering** for static options
- **Hide search** option for simple dropdowns

### 🏷️ Advanced Selection
- **Tag customization** - Custom prefixes, suffixes, and styling
- **Plain label mode** - Show selections as text instead of tags
- **Responsive tags** - Automatically collapse tags with "+N more" indicator
- **Individual tag removal** - Remove specific selections in multiple mode

## Performance

- **90% fewer API calls** with intelligent caching
- **Debounced requests** prevent excessive API calls
- **Memory efficient** with automatic cache cleanup
- **Optimized rendering** with React.memo and useMemo

## Accessibility

- Full keyboard navigation support
- Screen reader friendly
- ARIA labels and descriptions
- Focus management
                `,
            },
        },
    },
    argTypes: {
        // =============================================================================
        // CORE SELECTION PROPS
        // =============================================================================
        placeholder: {
            control: 'text',
            description: 'Placeholder text displayed when no option is selected',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '"Select an option"' },
                category: 'Core Selection',
            },
        },
        mode: {
            control: 'select',
            options: ['single', 'multiple'],
            description:
                'Selection mode - single allows one selection, multiple allows multiple with tags',
            table: {
                type: { summary: '"single" | "multiple"' },
                defaultValue: { summary: '"single"' },
                category: 'Core Selection',
            },
        },
        value: {
            control: 'object',
            description: 'Controlled value - can be single value or array for multiple mode',
            table: {
                type: { summary: 'any | any[]' },
                category: 'Core Selection',
            },
        },
        defaultValue: {
            control: 'object',
            description: 'Default value for uncontrolled usage',
            table: {
                type: { summary: 'any | any[]' },
                category: 'Core Selection',
            },
        },
        options: {
            control: 'object',
            description:
                'Static options array. Each option should have value, label, and optional disabled, prefix, suffix',
            table: {
                type: { summary: 'SelectOption[]' },
                category: 'Core Selection',
            },
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the component is disabled and prevents all interactions',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Core Selection',
            },
        },
        creatable: {
            control: 'boolean',
            description: 'Whether to allow creating new options',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Core Selection',
            },
        },

        // =============================================================================
        // DISPLAY & LAYOUT PROPS
        // =============================================================================
        size: {
            control: 'select',
            options: ['md', 'lg'],
            description:
                'Size variant affecting height and font size: md (36px height) or lg (48px height)',
            table: {
                type: { summary: '"md" | "lg"' },
                defaultValue: { summary: '"md"' },
                category: 'Display & Layout',
            },
        },
        loading: {
            control: 'boolean',
            description: 'Shows loading spinner in dropdown when true',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Display & Layout',
            },
        },
        error: {
            control: 'boolean',
            description: 'Whether to show error state styling (red borders and helper text)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Display & Layout',
            },
        },
        helperText: {
            control: 'text',
            description: 'Helper text displayed below the select (shows in red when error=true)',
            table: {
                type: { summary: 'string' },
                category: 'Display & Layout',
            },
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes to apply to the component',
            table: {
                type: { summary: 'string' },
                category: 'Display & Layout',
            },
        },

        // =============================================================================
        // VISUAL CUSTOMIZATION PROPS
        // =============================================================================
        floatLabel: {
            control: 'boolean',
            description:
                'Whether placeholder floats above input when focused/has value (Material Design style)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Visual Customization',
            },
        },
        centerAligned: {
            control: 'boolean',
            description: 'Whether to center-align content, prefix, and suffix',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Visual Customization',
            },
        },
        iconOnly: {
            control: 'boolean',
            description: 'Show only prefix icon, hiding input area (useful for toolbar selects)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Visual Customization',
            },
        },
        plainLabel: {
            control: 'boolean',
            description: 'For multiple mode: show selected values as plain text instead of tags',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Visual Customization',
            },
        },
        showTickIcon: {
            control: 'boolean',
            description:
                'Whether to show chevron icon on right side (changes color based on selection)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Visual Customization',
            },
        },
        prefix: {
            control: 'object',
            description: 'Icon or element to display before the input',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Visual Customization',
            },
        },
        suffix: {
            control: 'object',
            description: 'Icon or element to display after the input (before chevron)',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Visual Customization',
            },
        },

        // =============================================================================
        // SEARCH & FILTERING PROPS
        // =============================================================================
        hideSearch: {
            control: 'boolean',
            description: 'Whether to hide the search input in dropdown',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Search & Filtering',
            },
        },
        searchThreshold: {
            control: { type: 'number', min: 0, max: 10, step: 1 },
            description: 'Minimum characters required before triggering async search',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' },
                category: 'Search & Filtering',
            },
        },
        debounceTimeout: {
            control: { type: 'number', min: 100, max: 2000, step: 100 },
            description: 'Delay in ms before triggering search after user stops typing',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '300' },
                category: 'Search & Filtering',
            },
        },

        // =============================================================================
        // ASYNC DATA LOADING PROPS
        // =============================================================================
        onSearchLoad: {
            control: false,
            description:
                'Async function called when user searches. Returns Promise<SelectOption[]>',
            table: {
                type: { summary: '(search: string) => Promise<SelectOption[]>' },
                category: 'Async Data Loading',
            },
        },
        onFocusLoad: {
            control: false,
            description:
                'Async function called when dropdown opens. Returns Promise<SelectOption[]>',
            table: {
                type: { summary: '() => Promise<SelectOption[]>' },
                category: 'Async Data Loading',
            },
        },
        loadOnMount: {
            control: 'boolean',
            description: 'Whether to automatically call onFocusLoad when component mounts',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Async Data Loading',
            },
        },

        // =============================================================================
        // CACHING PROPS
        // =============================================================================
        cacheOptions: {
            control: 'boolean',
            description: 'Whether to enable intelligent caching for async operations',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Caching',
            },
        },
        cacheTimeout: {
            control: { type: 'number', min: 1000, max: 3600000, step: 1000 },
            description: 'Cache timeout in milliseconds (default: 5 minutes)',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '300000' },
                category: 'Caching',
            },
        },
        cacheKey: {
            control: 'text',
            description: 'Custom cache key for sharing cache between components',
            table: {
                type: { summary: 'string' },
                category: 'Caching',
            },
        },

        // =============================================================================
        // EVENT HANDLERS
        // =============================================================================
        onChange: {
            control: false,
            description: 'Called when selection changes',
            table: {
                type: { summary: '(value: any, option?: SelectOption) => void' },
                category: 'Event Handlers',
            },
        },
        onSelect: {
            control: false,
            description: 'Called when an option is selected',
            table: {
                type: { summary: '(value: any, option: SelectOption) => void' },
                category: 'Event Handlers',
            },
        },
        onDeselect: {
            control: false,
            description: 'Called when an option is deselected (multiple mode)',
            table: {
                type: { summary: '(value: any, option: SelectOption) => void' },
                category: 'Event Handlers',
            },
        },
        onSearch: {
            control: false,
            description: 'Called when search input changes',
            table: {
                type: { summary: '(value: string) => void' },
                category: 'Event Handlers',
            },
        },
        onFocus: {
            control: false,
            description: 'Called when component gains focus',
            table: {
                type: { summary: '(e: React.FocusEvent) => void' },
                category: 'Event Handlers',
            },
        },
        onBlur: {
            control: false,
            description: 'Called when component loses focus',
            table: {
                type: { summary: '(e: React.FocusEvent) => void' },
                category: 'Event Handlers',
            },
        },
        defaultOpen: {
            control: 'boolean',
            description:
                'When true, dropdown options will be shown by default when the component mounts.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Core Selection',
            },
        },
    },
};

// =============================================================================
// MOCK DATA
// =============================================================================

const technologies = [
    {
        value: '1',
        label: 'React',
        prefix: <ApiOutlined style={{ color: '#61DAFB' }} />,
    },
    { value: '2', label: 'Vue.js', prefix: <CloudOutlined style={{ color: '#4FC08D' }} /> },
    {
        value: '3',
        label: '4',
        prefix: <ThunderboltOutlined style={{ color: '#DD0031' }} />,
    },
    { value: '5', label: 'Svelte', prefix: <FireOutlined style={{ color: '#FF3E00' }} /> },
    { value: '6', label: 'Next.js', prefix: <RocketOutlined style={{ color: '#000000' }} /> },
    { value: '7', label: 'Nuxt.js', prefix: <StarOutlined style={{ color: '#00C58E' }} /> },
    { value: '8', label: 'Gatsby', prefix: <GiftOutlined style={{ color: '#663399' }} /> },
    { value: '9', label: 'Remix', prefix: <ThunderboltFilled style={{ color: '#000000' }} /> },
];

const users = [
    { value: 'john', label: 'John Doe', prefix: <UserOutlined />, suffix: 'Admin' },
    { value: 'jane', label: 'Jane Smith', prefix: <UserOutlined />, suffix: 'User' },
    { value: 'mike', label: 'Mike Johnson', prefix: <UserOutlined />, suffix: 'Manager' },
    { value: 'sarah', label: 'Sarah Wilson', prefix: <UserOutlined />, suffix: 'Developer' },
    { value: 'tom', label: 'Tom Brown', prefix: <UserOutlined />, suffix: 'Designer' },
    { value: 'lisa', label: 'Lisa Davis', prefix: <UserOutlined />, suffix: 'Analyst' },
    { value: 'david', label: 'David Miller', prefix: <UserOutlined />, suffix: 'Tester' },
    { value: 'emma', label: 'Emma Wilson', prefix: <UserOutlined />, suffix: 'PM' },
];

const countries = [
    { value: 'us', label: 'United States', prefix: '🇺🇸' },
    { value: 'uk', label: 'United Kingdom', prefix: '🇬🇧' },
    { value: 'ca', label: 'Canada', prefix: '🇨🇦' },
    { value: 'au', label: 'Australia', prefix: '🇦🇺' },
    { value: 'de', label: 'Germany', prefix: '🇩🇪' },
    { value: 'fr', label: 'France', prefix: '🇫🇷' },
    { value: 'jp', label: 'Japan', prefix: '🇯🇵' },
    { value: 'kr', label: 'South Korea', prefix: '🇰🇷' },
    { value: 'cn', label: 'China', prefix: '🇨🇳' },
    { value: 'in', label: 'India', prefix: '🇮🇳' },
];

const departments = [
    {
        value: 'engineering',
        label: 'Engineering',
        prefix: <ToolOutlined style={{ color: '#1890ff' }} />,
    },
    { value: 'design', label: 'Design', prefix: <EditOutlined style={{ color: '#722ed1' }} /> },
    {
        value: 'marketing',
        label: 'Marketing',
        prefix: <BellOutlined style={{ color: '#eb2f96' }} />,
    },
    { value: 'sales', label: 'Sales', prefix: <ShopOutlined style={{ color: '#52c41a' }} /> },
    {
        value: 'hr',
        label: 'Human Resources',
        prefix: <TeamOutlined style={{ color: '#fa8c16' }} />,
    },
    { value: 'finance', label: 'Finance', prefix: <BankOutlined style={{ color: '#13c2c2' }} /> },
    {
        value: 'operations',
        label: 'Operations',
        prefix: <SettingOutlined style={{ color: '#a0d911' }} />,
    },
    { value: 'legal', label: 'Legal', prefix: <BookOutlined style={{ color: '#f5222d' }} /> },
];

const priorities = [
    {
        value: 'low',
        label: 'Low Priority',
        prefix: (
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#52c41a' }} />
        ),
    },
    {
        value: 'medium',
        label: 'Medium Priority',
        prefix: (
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#fa8c16' }} />
        ),
    },
    {
        value: 'high',
        label: 'High Priority',
        prefix: (
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f5222d' }} />
        ),
    },
    {
        value: 'urgent',
        label: 'Urgent',
        prefix: (
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#722ed1' }} />
        ),
    },
];

// =============================================================================
// MOCK API FUNCTIONS
// =============================================================================

const createMockAPI = (data, delay = 800, errorRate = 0) => {
    return async (search = '') => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Simulate occasional errors
        if (Math.random() < errorRate) {
            throw new Error('Network error occurred');
        }

        // Filter data based on search
        const filtered = data.filter(
            (item) =>
                item.label.toLowerCase().includes(search.toLowerCase()) ||
                (item.value && item.value.toLowerCase().includes(search.toLowerCase()))
        );

        return filtered;
    };
};

const createMockFocusAPI = (data, delay = 600) => {
    return async () => {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return data;
    };
};

// Mock API that accepts parameters
const mockParameterizedAPI = async (params) => {
    // Simulate API call with parameters
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Return different data based on parameters
    const baseData = [
        { value: 'item1', label: 'Item 1' },
        { value: 'item2', label: 'Item 2' },
        { value: 'item3', label: 'Item 3' },
    ];

    if (params?.category === 'electronics') {
        return [
            { value: 'laptop', label: 'Laptop' },
            { value: 'phone', label: 'Smartphone' },
            { value: 'tablet', label: 'Tablet' },
            { value: 'camera', label: 'Camera' },
        ];
    } else if (params?.category === 'clothing') {
        return [
            { value: 'shirt', label: 'Shirt' },
            { value: 'pants', label: 'Pants' },
            { value: 'jacket', label: 'Jacket' },
            { value: 'shoes', label: 'Shoes' },
        ];
    } else if (params?.category === 'food') {
        return [
            { value: 'fruit', label: 'Fruit' },
            { value: 'vegetable', label: 'Vegetable' },
            { value: 'meat', label: 'Meat' },
            { value: 'dairy', label: 'Dairy' },
        ];
    }

    return baseData;
};

// =============================================================================
// STORY TEMPLATES
// =============================================================================

const mockSearchAPI = async (search, ...args) => {
    return fetch(`https://jsonplaceholder.typicode.com/users?q=${search}`).then((res) =>
        res.json().then((data) => {
            return { value: data.id, label: data.name };
        })
    );
};

const mockFocusAPI = async (id) => {
    if (!id) {
        return fetch(`https://jsonplaceholder.typicode.com/users`).then((res) =>
            res.json().then((data) => data.map((user) => ({ value: user.id, label: user.name })))
        );
    }

    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) =>
        res.json().then((data) => data.map((user) => ({ value: user.id, label: user.name })))
    );
};

const BasicTemplate = (args) => {
    const [value, setValue] = useState(args.value || args.defaultValue);

    return (
        <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
            <Select
                {...args}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    args.onChange?.(newValue);
                }}
            />
        </div>
    );
};

const AsyncTemplate = (args) => {
    const [value, setValue] = useState(args.value || args.defaultValue);
    const [logs, setLogs] = useState([]);

    const addLog = (message, type = 'info') => {
        setLogs((prev) => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }]);
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
            <Select
                {...args}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    addLog(`Selection changed: ${JSON.stringify(newValue)}`, 'success');
                    args.onChange?.(newValue);
                }}
                onSearchLoad={mockSearchAPI}
                onFocusLoad={mockFocusAPI}
            />

            {logs.length > 0 && (
                <div
                    style={{
                        marginTop: '20px',
                        padding: '16px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px',
                        maxHeight: '200px',
                        overflow: 'auto',
                    }}
                >
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
                        Activity Log
                    </h4>
                    {logs.map((log, index) => (
                        <div
                            key={index}
                            style={{
                                fontSize: '12px',
                                marginBottom: '4px',
                                color:
                                    log.type === 'error'
                                        ? '#f5222d'
                                        : log.type === 'success'
                                        ? '#52c41a'
                                        : '#666',
                            }}
                        >
                            <span style={{ color: '#999' }}>{log.timestamp}</span> - {log.message}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// =============================================================================
// BASIC STORIES
// =============================================================================

export const Default = BasicTemplate.bind({});
Default.args = {
    placeholder: 'Select a technology...',
    options: technologies,
};

export const WithValue = BasicTemplate.bind({});
WithValue.args = {
    placeholder: 'Select a technology...',
    options: technologies,
    value: 'react',
};

const MultipleTemplate = (args) => {
    const [value, setValue] = useState(args.value || args.defaultValue);

    return (
        <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
            <Select {...args} value={value} onChange={setValue} />
        </div>
    );
};

export const Multiple = {
    render: MultipleTemplate,
    args: {
        placeholder: 'Select technologies...1',
        options: technologies,
        mode: 'multiple',
    },
};

export const Disabled = BasicTemplate.bind({});
Disabled.args = {
    placeholder: 'Select a technology...',
    options: technologies,
    disabled: true,
    value: 'react',
};

export const WithError = BasicTemplate.bind({});
WithError.args = {
    placeholder: 'Select a technology...',
    options: technologies,
    error: true,
    helperText: 'This field is required',
};

export const Loading = BasicTemplate.bind({});
Loading.args = {
    placeholder: 'Loading options...',
    options: technologies,
    loading: true,
};

// =============================================================================
// SIZE VARIANTS
// =============================================================================

export const SizeVariants = () => {
    const [values, setValues] = useState({ md: 'react', lg: 'vue' });

    return (
        <div
            style={{
                maxWidth: 400,
                margin: '0 auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
            }}
        >
            <div>
                <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                    Medium Size (md)
                </h4>
                <Select
                    size="md"
                    placeholder="Select technology..."
                    options={technologies}
                    value={values.md}
                    onChange={(value) => setValues((prev) => ({ ...prev, md: value }))}
                />
            </div>
            <div>
                <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                    Large Size (lg)
                </h4>
                <Select
                    size="lg"
                    placeholder="Select technology..."
                    options={technologies}
                    value={values.lg}
                    onChange={(value) => setValues((prev) => ({ ...prev, lg: value }))}
                />
            </div>
        </div>
    );
};

// =============================================================================
// VISUAL CUSTOMIZATION
// =============================================================================

export const WithPrefixSuffix = BasicTemplate.bind({});
WithPrefixSuffix.args = {
    placeholder: 'Select user...',
    options: users,
    prefix: <UserOutlined />,
    suffix: <SettingOutlined />,
};

export const CenterAligned = BasicTemplate.bind({});
CenterAligned.args = {
    placeholder: 'Select country...',
    options: countries,
    centerAligned: true,
};

export const IconOnly = BasicTemplate.bind({});
IconOnly.args = {
    options: countries,
    iconOnly: true,
    prefix: <GlobalOutlined />,
    placeholder: 'Country',
};

export const PlainLabel = BasicTemplate.bind({});
PlainLabel.args = {
    placeholder: 'Select departments...',
    options: departments,
    mode: 'multiple',
    plainLabel: true,
    defaultValue: ['engineering', 'design'],
};

export const WithoutTickIcon = BasicTemplate.bind({});
WithoutTickIcon.args = {
    placeholder: 'Select priority...',
    options: priorities,
    showTickIcon: false,
};

// =============================================================================
// SEARCH & FILTERING
// =============================================================================

export const HideSearch = BasicTemplate.bind({});
HideSearch.args = {
    placeholder: 'Select priority...',
    options: priorities,
    hideSearch: true,
};

export const SearchThreshold = BasicTemplate.bind({});
SearchThreshold.args = {
    placeholder: 'Type at least 2 characters...',
    options: technologies,
    searchThreshold: 2,
};

// =============================================================================
// ASYNC DATA LOADING
// =============================================================================

export const SearchLoad = AsyncTemplate.bind({});
SearchLoad.args = {
    placeholder: 'Search for technologies...',
    onSearchLoad: createMockAPI(technologies, 800),
    searchThreshold: 1,
};

export const FocusLoad = AsyncTemplate.bind({});
FocusLoad.args = {
    placeholder: 'Click to load options...',
    onFocusLoad: createMockFocusAPI(technologies, 600),
};

export const CombinedLoading = AsyncTemplate.bind({});
CombinedLoading.args = {
    placeholder: 'Static + Dynamic options...',
    options: [
        { value: 'static1', label: 'Static Option 1', prefix: <HomeOutlined /> },
        { value: 'static2', label: 'Static Option 2', prefix: <HomeOutlined /> },
    ],
    onFocusLoad: createMockFocusAPI(departments, 600),
    onSearchLoad: createMockAPI(technologies, 800),
    searchThreshold: 1,
};

export const LoadOnMount = AsyncTemplate.bind({});
LoadOnMount.args = {
    placeholder: 'Auto-loading options...',
    onFocusLoad: createMockFocusAPI(technologies, 1000),
    loadOnMount: true,
};

// =============================================================================
// CACHING DEMONSTRATION
// =============================================================================

export const CachingDemo = () => {
    const [cacheHits, setCacheHits] = useState(0);
    const [cacheMisses, setCacheMisses] = useState(0);
    const [logs, setLogs] = useState([]);
    const [value, setValue] = useState(null);
    const [paramValue, setParamValue] = useState(null);
    const valueRef = useRef(null);

    const addLog = (message, type = 'info') => {
        setLogs((prev) => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }]);
    };

    // Create a parameterized onFocusLoad function that uses the current value
    const parameterizedFocusLoad = useCallback(async () => {
        // Log the parameter being used
        if (value) {
            addLog(`Loading data with parameter: ${value}`, 'info');
        } else {
            addLog(`Loading data with no parameter`, 'info');
        }

        // Call mockFocusAPI with the current value
        try {
            const result = await mockFocusAPI(value);
            addLog(
                `Loaded ${result?.length || 0} items for parameter: ${value || 'none'}`,
                'success'
            );
            return result;
        } catch (error) {
            addLog(`Error loading data: ${error.message}`, 'error');
            return [];
        }
    }, [value, addLog]);

    // Effect to detect value changes
    useEffect(() => {
        if (valueRef.current !== null && valueRef.current !== value) {
            addLog(
                `Parameter changed from ${valueRef.current || 'none'} to ${value || 'none'}`,
                'warning'
            );
        }
        valueRef.current = value;
    }, [value, addLog]);

    // Clear logs
    const clearLogs = () => {
        setLogs([]);
        setCacheHits(0);
        setCacheMisses(0);
    };

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
            <div
                style={{
                    marginBottom: '20px',
                    padding: '16px',
                    backgroundColor: '#f0f2f5',
                    borderRadius: '8px',
                }}
            >
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
                    Cache Performance with Parameter Support
                </h3>
                <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
                    <div>
                        Cache Hits: <strong style={{ color: '#52c41a' }}>{cacheHits}</strong>
                    </div>
                    <div>
                        Cache Misses: <strong style={{ color: '#f5222d' }}>{cacheMisses}</strong>
                    </div>
                    <div>
                        Hit Rate:{' '}
                        <strong>
                            {cacheHits + cacheMisses > 0
                                ? Math.round((cacheHits / (cacheHits + cacheMisses)) * 100)
                                : 0}
                            %
                        </strong>
                    </div>
                    <div>
                        <button
                            onClick={clearLogs}
                            style={{
                                padding: '4px 8px',
                                backgroundColor: '#f0f0f0',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px',
                            }}
                        >
                            Reset Stats
                        </button>
                    </div>
                </div>
            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    marginBottom: '20px',
                }}
            >
                <div>
                    <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                        Select 1 (Set Parameter)
                    </h4>
                    <Select
                        placeholder="Select a user ID..."
                        options={[...technologies, { value: '1', label: 'React' }]}
                        value={value}
                        clearable={true}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                    />
                    <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                        Select a user ID above, then click the dropdown below to load data with that
                        parameter
                    </div>
                </div>
                <div>
                    <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                        Select 2 (Parameter-Aware Cache)
                    </h4>
                    <Select
                        placeholder="Click to load data with parameter..."
                        onFocusLoad={parameterizedFocusLoad}
                        cacheOptions={true}
                        cacheTimeout={10000} // 10 seconds for demo
                        onCacheHit={(key) => {
                            setCacheHits((prev) => prev + 1);
                            addLog(`Cache HIT for key: ${key}`, 'success');
                        }}
                        onCacheMiss={(key) => {
                            setCacheMisses((prev) => prev + 1);
                            addLog(`Cache MISS for key: ${key}`, 'warning');
                        }}
                        value={paramValue}
                        onChange={(newValue) => {
                            setParamValue(newValue);
                            addLog(`Selected value: ${newValue}`, 'info');
                        }}
                    />
                    <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                        1. Open this dropdown to load data with the parameter 2. Close and reopen to
                        see cache in action 3. Change the parameter above and try again
                    </div>
                </div>
            </div>

            {logs.length > 0 && (
                <div
                    style={{
                        padding: '16px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px',
                        maxHeight: '300px',
                        overflow: 'auto',
                    }}
                >
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
                        Cache Activity Log
                    </h4>
                    {logs.map((log, index) => (
                        <div
                            key={index}
                            style={{
                                fontSize: '12px',
                                marginBottom: '4px',
                                color:
                                    log.type === 'error'
                                        ? '#f5222d'
                                        : log.type === 'success'
                                        ? '#52c41a'
                                        : log.type === 'warning'
                                        ? '#fa8c16'
                                        : '#666',
                            }}
                        >
                            <span style={{ color: '#999' }}>{log.timestamp}</span> - {log.message}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// =============================================================================
// ADVANCED EXAMPLES
// =============================================================================

export const ComplexExample = () => {
    const [formData, setFormData] = useState({
        technologies: ['react'],
        users: [],
        country: 'us',
        departments: ['engineering'],
        priority: 'medium',
    });

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
            <h3
                style={{
                    marginBottom: '24px',
                    fontSize: '18px',
                    fontWeight: '600',
                    textAlign: 'center',
                }}
            >
                Complex Form Example
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                        }}
                    >
                        Technologies (Multiple)
                    </label>
                    <Select
                        placeholder="Select technologies..."
                        options={technologies}
                        mode="multiple"
                        value={formData.technologies}
                        onChange={(value) => updateField('technologies', value)}
                    />
                </div>

                <div>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                        }}
                    >
                        Team Members (Async Search)
                    </label>
                    <Select
                        placeholder="Search for users..."
                        mode="multiple"
                        value={formData.users}
                        onChange={(value) => updateField('users', value)}
                        onSearchLoad={createMockAPI(users, 600)}
                        searchThreshold={1}
                    />
                </div>

                <div>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                        }}
                    >
                        Country (With Flags)
                    </label>
                    <Select
                        placeholder="Select country..."
                        options={countries}
                        value={formData.country}
                        onChange={(value) => updateField('country', value)}
                        size="lg"
                    />
                </div>

                <div>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                        }}
                    >
                        Departments (Plain Label)
                    </label>
                    <Select
                        placeholder="Select departments..."
                        options={departments}
                        mode="multiple"
                        value={formData.departments}
                        onChange={(value) => updateField('departments', value)}
                        plainLabel={true}
                    />
                </div>

                <div>
                    <label
                        style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontSize: '14px',
                            fontWeight: '500',
                        }}
                    >
                        Priority (No Search)
                    </label>
                    <Select
                        placeholder="Select priority..."
                        options={priorities}
                        value={formData.priority}
                        onChange={(value) => updateField('priority', value)}
                        hideSearch={true}
                    />
                </div>
            </div>

            <div
                style={{
                    marginTop: '24px',
                    padding: '16px',
                    backgroundColor: '#f0f2f5',
                    borderRadius: '8px',
                }}
            >
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600' }}>
                    Form Data
                </h4>
                <pre style={{ fontSize: '12px', margin: 0, overflow: 'auto' }}>
                    {JSON.stringify(formData, null, 2)}
                </pre>
            </div>
        </div>
    );
};

// =============================================================================
// PARAMETER SUPPORT DEMO
// =============================================================================

export const ParameterSupportDemo = () => {
    const [value, setValue] = useState(null);
    const [category, setCategory] = useState('electronics');
    const [logs, setLogs] = useState([]);
    const [cacheEnabled, setCacheEnabled] = useState(true);

    // Function to add logs to the UI
    const addLog = (message, type = 'info') => {
        setLogs((prev) => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }]);
    };

    // Create a parameterized onFocusLoad function
    const handleFocusLoad = useCallback(async () => {
        addLog(`API call with category: ${category}`, 'info');
        const result = await mockParameterizedAPI({ category });
        addLog(`Loaded ${result.length} items for category: ${category}`, 'success');
        return result;
    }, [category, addLog]);

    // Clear logs
    const clearLogs = () => {
        setLogs([]);
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
            <h3>Parameter Support Demo</h3>
            <p>
                This demo shows how the Select component handles parameter changes for onFocusLoad.
                When parameters change, the cache is invalidated and a fresh API call is made.
            </p>

            <div style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                    Select Category
                </h4>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    {['electronics', 'clothing', 'food'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setCategory(cat);
                                addLog(`Category changed to: ${cat}`, 'info');
                            }}
                            style={{
                                padding: '8px 12px',
                                backgroundColor: category === cat ? '#1890ff' : '#f0f0f0',
                                color: category === cat ? 'white' : 'black',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={cacheEnabled}
                            onChange={() => setCacheEnabled(!cacheEnabled)}
                            style={{ marginRight: '8px' }}
                        />
                        Enable caching
                    </label>
                </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <Select
                    placeholder={`Select ${category} item...`}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                        addLog(`Selection changed: ${newValue}`, 'success');
                    }}
                    onFocusLoad={handleFocusLoad}
                    cacheOptions={cacheEnabled}
                    cacheTimeout={10000} // 10 seconds for demo purposes
                    onCacheHit={(key) => addLog(`Cache hit: ${key}`, 'info')}
                    onCacheMiss={(key) => addLog(`Cache miss: ${key}`, 'warning')}
                />
            </div>

            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <h4 style={{ margin: '0', fontSize: '14px', fontWeight: '600' }}>Activity Log</h4>
                <button
                    onClick={clearLogs}
                    style={{
                        padding: '4px 8px',
                        backgroundColor: '#f0f0f0',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                    }}
                >
                    Clear logs
                </button>
            </div>

            <div
                style={{
                    padding: '16px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    maxHeight: '200px',
                    overflow: 'auto',
                }}
            >
                {logs.length === 0 ? (
                    <div style={{ color: '#999', fontSize: '12px' }}>
                        No activity yet. Click the dropdown to load options.
                    </div>
                ) : (
                    logs.map((log, index) => (
                        <div
                            key={index}
                            style={{
                                fontSize: '12px',
                                marginBottom: '4px',
                                color:
                                    log.type === 'error'
                                        ? '#f5222d'
                                        : log.type === 'success'
                                        ? '#52c41a'
                                        : log.type === 'warning'
                                        ? '#faad14'
                                        : '#666',
                            }}
                        >
                            <span style={{ color: '#999' }}>{log.timestamp}</span> - {log.message}
                        </div>
                    ))
                )}
            </div>

            <div style={{ marginTop: '20px', fontSize: '13px', color: '#666' }}>
                <p>
                    <strong>Instructions:</strong>
                </p>
                <ol style={{ paddingLeft: '20px', margin: '8px 0' }}>
                    <li>Click the dropdown to load options for the current category</li>
                    <li>Close and reopen the dropdown to see cache in action</li>
                    <li>Change the category and open the dropdown to see a fresh API call</li>
                    <li>Toggle caching to see the difference in behavior</li>
                </ol>
            </div>
        </div>
    );
};

// =============================================================================
// PERFORMANCE TEST
// =============================================================================

export const PerformanceTest = () => {
    const [apiCalls, setApiCalls] = useState(0);
    const [lastCallTime, setLastCallTime] = useState(null);

    const trackingAPI = async (search) => {
        setApiCalls((prev) => prev + 1);
        setLastCallTime(new Date().toLocaleTimeString());

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        return technologies.filter((tech) =>
            tech.label.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px' }}>
            <div
                style={{
                    marginBottom: '20px',
                    padding: '16px',
                    backgroundColor: '#f0f2f5',
                    borderRadius: '8px',
                }}
            >
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
                    Performance Metrics
                </h3>
                <div style={{ display: 'flex', gap: '20px', fontSize: '14px' }}>
                    <div>
                        API Calls: <strong style={{ color: '#1890ff' }}>{apiCalls}</strong>
                    </div>
                    <div>
                        Last Call: <strong>{lastCallTime || 'None'}</strong>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                    <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                        With Caching (Recommended)
                    </h4>
                    <Select
                        placeholder="Search with caching..."
                        options={technologies}
                        onSearchLoad={trackingAPI}
                        cacheOptions={true}
                        cacheTimeout={30000} // 30 seconds
                        debounceTimeout={300}
                        onScrollEnd={(e) => {
                            // Load more data here
                        }}
                        scrollThreshold={10}
                    />
                </div>
                <div>
                    <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                        Without Caching
                    </h4>
                    <Select
                        placeholder="Search without caching..."
                        onSearchLoad={trackingAPI}
                        cacheOptions={false}
                        debounceTimeout={300}
                    />
                </div>
            </div>

            <div
                style={{
                    marginTop: '16px',
                    padding: '12px',
                    backgroundColor: '#fff2e8',
                    borderRadius: '6px',
                    fontSize: '12px',
                }}
            >
                <strong>Test Instructions:</strong> Type the same search term in both selects.
                Notice how the cached version reduces API calls significantly.
            </div>
        </div>
    );
};

// =============================================================================
// PLAYGROUND STORY
// =============================================================================

export const Playground = BasicTemplate.bind({});
Playground.args = {
    placeholder: 'Playground select...',
    options: technologies,
    size: 'md',
    mode: 'single',
    disabled: false,
    loading: false,
    error: false,
    floatLabel: true,
    centerAligned: false,
    iconOnly: false,
    plainLabel: false,
    showTickIcon: true,
    hideSearch: false,
    searchThreshold: 0,
    debounceTimeout: 300,
    cacheOptions: true,
    cacheTimeout: 300000,
    loadOnMount: false,
};

export const WithDefaultOpen = () => {
    const [value, setValue] = useState(null);

    return (
        <div>
            <h3>With defaultOpen=true</h3>
            <p>Dropdown will be open by default when component mounts</p>
            <Select
                placeholder="Select an option"
                options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' },
                ]}
                value={value}
                onChange={(val) => setValue(val)}
                defaultOpen={true}
                style={{ width: '100%', marginBottom: '20px' }}
            />

            <h3>Standard behavior (defaultOpen=false)</h3>
            <p>Dropdown will be closed by default</p>
            <Select
                placeholder="Select an option"
                options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' },
                ]}
                value={value}
                onChange={(val) => setValue(val)}
                style={{ width: '100%' }}
            />
        </div>
    );
};

export const WithDisabledOptions = () => {
    const [value, setValue] = useState(['2', '4']);

    const options = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2', disabled: true },
        { value: '3', label: 'Option 3' },
        { value: '4', label: 'Option 4', disabled: true },
        { value: '5', label: 'Option 5' },
    ];

    return (
        <div>
            <h3>Single Select with Disabled Options</h3>
            <Select
                placeholder="Select an option"
                options={options}
                value={value}
                onChange={(val) => setValue(val)}
                style={{ width: '100%', marginBottom: '20px' }}
            />

            <h3>Multi Select with Disabled Options</h3>
            <Select
                placeholder="Select multiple options"
                options={options}
                mode="multiple"
                value={value}
                onChange={(val) => setValue(val)}
                style={{ width: '100%' }}
            />
        </div>
    );
};

export const WithScrollLoading = () => {
    const [value, setValue] = useState([]);
    const [page, setPage] = useState(1);
    const [options, setOptions] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    // Simulate loading initial options
    useEffect(() => {
        // Generate initial options
        const initialOptions = Array.from({ length: 20 }, (_, i) => ({
            value: `option-${i + 1}`,
            label: `Option ${i + 1}`,
        }));

        setOptions(initialOptions);
    }, []);

    // Simulate loading more options on scroll
    const handleScrollEnd = async () => {
        // If we've reached the end, don't load more
        if (!hasMore) return;

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Generate more options
        const nextPage = page + 1;
        const moreOptions = Array.from({ length: 20 }, (_, i) => {
            const index = (nextPage - 1) * 20 + i + 1;
            return {
                value: `option-${index}`,
                label: `Option ${index}`,
            };
        });

        // Update state
        setOptions((prev) => [...prev, ...moreOptions]);
        setPage(nextPage);

        // Stop loading more after 5 pages (100 items)
        if (nextPage >= 5) {
            setHasMore(false);
        }
    };

    return (
        <div>
            <h3>Select with Scroll Loading</h3>
            <p>Scroll to the bottom to load more options</p>
            <Select
                placeholder="Select options"
                mode="single"
                options={options}
                value={value}
                onChange={setValue}
                onScrollEnd={() => {
                    console.log('scroll end');
                }}
                scrollThreshold={50}
                style={{ width: '100%' }}
            />
        </div>
    );
};
