'use client';

import { useState } from 'react';
import DrawerComponent from '@/components/Drawer';
import CollapseComponent from '@/components/Collapse';
import Input from '@/components/Input';
import Select from '@/components/Select';
import ButtonComponent from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Text from '@/components/Text';
import { Add, EditPencil } from '@/icons';

const Drawer = DrawerComponent as React.ComponentType<any>;
const Collapse = CollapseComponent as React.ComponentType<any>;
const Button = ButtonComponent as React.ComponentType<any>;

const SCOPE_OPTIONS = ['Origin Location', 'Dest. Location', 'Container', 'Commodity', 'Routing', 'Operator'];

const TAG_OPTIONS = [
    { label: 'Ocean Freight', value: 'ocean-freight' },
    { label: 'Air Freight', value: 'air-freight' },
    { label: 'FCL', value: 'fcl' },
    { label: 'LCL', value: 'lcl' },
    { label: 'Hazardous', value: 'hazardous' },
    { label: 'Perishable', value: 'perishable' },
    { label: 'High Value', value: 'high-value' },
    { label: 'Express', value: 'express' },
];

export default function Home() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
    const [activeKeys, setActiveKeys] = useState<string[]>(['1']);

    // Form values
    const [ruleName, setRuleName] = useState('');
    const [description, setDescription] = useState('');
    const [ruleType, setRuleType] = useState(false);
    const [selectedScopes, setSelectedScopes] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const isStep1Done = completedSteps.has('1');
    const isStep2Done = completedSteps.has('2');
    const isStep3Done = completedSteps.has('3');

    const handleSave = (step: string) => {
        const next = String(Number(step) + 1);
        setCompletedSteps(prev => new Set([...prev, step]));
        setActiveKeys(prev => {
            const without = prev.filter(k => k !== step);
            return Number(next) <= 3 ? [...without, next] : without;
        });
    };

    const handleEdit = (step: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveKeys(prev => prev.includes(step) ? prev : [...prev, step]);
    };

    const handleClose = () => {
        setDrawerOpen(false);
        setCompletedSteps(new Set());
        setActiveKeys(['1']);
        setRuleName('');
        setDescription('');
        setRuleType(false);
        setSelectedScopes([]);
        setSelectedTags([]);
    };

    const editSuffix = (step: string) => (
        <Button variant="link" size="md" icon={<EditPencil width={14} height={14} />} onClick={(e: React.MouseEvent) => handleEdit(step, e)}>
            Edit
        </Button>
    );

    const collapseItems = [
        {
            key: '1',
            label: 'Details',
            subLabel: 'Lorem ipsum',
            completed: isStep1Done,
            suffix: isStep1Done ? editSuffix('1') : null,
            children: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Text variant="body" size="md" weight="medium" style={{ textTransform: 'uppercase', color: 'var(--theme-color-grey-100)' }}>RULE NAME*</Text>
                            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>
                                Use a clear, descriptive name. Rule names must be unique across the platform.
                            </Text>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                            <Input
                                placeholder="Rule Name*"
                                value={ruleName}
                                onChange={(e: any) => setRuleName(e.target.value)}
                            />
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ flex: 1 }}>
                                    <Input
                                        placeholder="Description"
                                        value={description}
                                        onChange={(e: any) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Select
                                        placeholder="Tags"
                                        options={TAG_OPTIONS}
                                        mode="multiple"
                                        value={selectedTags}
                                        onChange={(val: string[]) => setSelectedTags(val)}
                                        helperText="Add or create tags to identify the rule"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="primary"
                            disabled={!ruleName.trim()}
                            onClick={() => handleSave('1')}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Type',
            subLabel: 'Lorem ipsum',
            completed: isStep2Done,
            disabled: !isStep1Done,
            suffix: isStep2Done ? editSuffix('2') : null,
            children: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Text variant="body" size="md" weight="medium" style={{ textTransform: 'uppercase', color: 'var(--theme-color-grey-100)' }}>RULE TYPE*</Text>
                            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>
                                Rule type defines how this rule will be used.
                            </Text>
                        </div>
                        <Checkbox
                            checked={ruleType}
                            onChange={(e: any) => setRuleType(e.target.checked)}
                        >
                            Base Margin
                        </Checkbox>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="primary"
                            disabled={!ruleType}
                            onClick={() => handleSave('2')}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            ),
        },
        {
            key: '3',
            label: 'Scope',
            subLabel: 'Lorem ipsum',
            completed: isStep3Done,
            disabled: !isStep2Done,
            suffix: isStep3Done ? editSuffix('3') : null,
            children: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Text variant="body" size="md" weight="medium" style={{ textTransform: 'uppercase', color: 'var(--theme-color-grey-100)' }}>RULE SCOPE*</Text>
                            <Text variant="body" size="sm" style={{ color: 'var(--theme-color-grey-50)' }}>
                                Define the parameters for this rule based on the selected types.
                            </Text>
                        </div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {SCOPE_OPTIONS.map(scope => (
                                <Button
                                    key={scope}
                                    variant={selectedScopes.includes(scope) ? 'primary' : 'tertiary'}
                                    size="md"
                                    icon={<Add width={10} height={10} />}
                                    onClick={() => setSelectedScopes(prev =>
                                        prev.includes(scope)
                                            ? prev.filter(s => s !== scope)
                                            : [...prev, scope]
                                    )}
                                >
                                    {scope}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="primary"
                            disabled={selectedScopes.length === 0}
                            onClick={() => handleSave('3')}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--theme-color-grey-5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button variant="primary" onClick={() => setDrawerOpen(true)}>Open Drawer</Button>

            <Drawer
                open={drawerOpen}
                onClose={handleClose}
                size="lg"
                title="Create New Rule"
                subtitle="Create a new ruleset & where it must be used"
                icon={Add}
                footer={
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                        <Button variant="primary" disabled={!isStep3Done}>Create Rule</Button>
                    </div>
                }
            >
                <Collapse
                    type="numbered"
                    items={collapseItems}
                    activeKey={activeKeys}
                    onChange={(keys: string | string[]) =>
                        setActiveKeys(Array.isArray(keys) ? keys : keys ? [keys] : [])
                    }
                />
            </Drawer>
        </div>
    );
}
