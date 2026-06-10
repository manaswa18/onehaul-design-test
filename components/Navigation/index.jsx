import React, { useMemo, useState } from 'react';
import { Menu } from 'antd';
import './Navigation.css';
import Input from '../Input';
import Text from '../Text';
import { Search } from '@/icons';

const getItems = (items) => {
    return items.map((item) => {
        const newItem = {
            ...item,
            icon: item.icon ? (
                <div className="onehaul-navigation-icon-container">
                    <item.icon width={12} height={12} />
                </div>
            ) : null,
            label: item.label,
        };

        if (item.children) {
            return {
                ...newItem,
                children: getItems(item.children),
            };
        }

        return newItem;
    });
};

const hasMatchingChild = (item, searchText) => {
    if (!item.children) return false;

    return item.children.some(
        (child) =>
            child.label.toLowerCase().includes(searchText.toLowerCase()) ||
            hasMatchingChild(child, searchText)
    );
};

const Navigation = ({
    items = [],
    defaultSelectedKeys = [],
    selectedKeys,
    defaultOpenKeys = [],
    showSearch = true,
    searchPlaceholder = 'Search',
    emptyMessage = 'No navigation items found',
    inlineCollapsed = false,
    setInlineCollapsed = () => {},
    showCollapsedMenu = true,
    headerNode = null,
    footerNode = null,
    ...props
}) => {
    const [search, setSearch] = useState('');

    const allItems = getItems(items);

    const collapsed = useMemo(() => !search?.trim() && inlineCollapsed, [search, inlineCollapsed]);

    const filteredItems = useMemo(() => {
        if (!allItems || !allItems.length) {
            return null;
        }

        return allItems.filter((item) => {
            const searchVal = search.toLowerCase();

            return (
                item.label.toLowerCase().includes(searchVal) || hasMatchingChild(item, searchVal)
            );
        });
    }, [allItems, search]);

    const handleSearch = (value) => {
        setSearch(value);
        props.onSearch?.(value);
    };

    if (!showCollapsedMenu && collapsed) {
        return null;
    }

    return (
        <div className="onehaul-navigation-container">
            <div className="onehaul-navigation-content">
                {headerNode ? <div className="onehaul-navigation-header">{headerNode}</div> : null}

                {showSearch ? (
                    <div className="onehaul-navigation-search-container">
                        <div className="onehaul-navigation-search-input">
                            {collapsed ? (
                                <div
                                    role="button"
                                    className="onehaul-navigation-search-input-collapsed"
                                    onClick={() => {
                                        setInlineCollapsed(false);
                                        handleSearch('');
                                    }}
                                >
                                    <Search
                                        width={18}
                                        height={18}
                                        color="var(--theme-color-grey-100)"
                                    />
                                </div>
                            ) : (
                                <Input
                                    placeholder={searchPlaceholder}
                                    value={search}
                                    onChange={(e) => {
                                        handleSearch(e.target.value);
                                    }}
                                    floated={false}
                                    suffix={
                                        <Search
                                            width={16}
                                            height={16}
                                            color="var(--theme-color-grey-100)"
                                        />
                                    }
                                />
                            )}
                        </div>
                    </div>
                ) : null}

                {filteredItems && filteredItems.length > 0 ? (
                    <Menu
                        className="onehaul-navigation"
                        items={filteredItems}
                        mode="inline"
                        theme="light"
                        defaultSelectedKeys={defaultSelectedKeys}
                        selectedKeys={selectedKeys}
                        defaultOpenKeys={defaultOpenKeys}
                        inlineCollapsed={collapsed}
                        {...props}
                    />
                ) : (
                    <Text className="onehaul-navigation-no-items-found">{emptyMessage}</Text>
                )}
            </div>

            {footerNode ? <div className="onehaul-navigation-footer">{footerNode}</div> : null}
        </div>
    );
};

export default Navigation;
