import { Checkbox, Tag, Dropdown, Input as AntInput } from 'antd';
import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import './Select.css';
import Text from '../Text';
import Button from '../Button';
import { Fail, Chevrondown, Search, Add } from '@/icons';

const CustomInputDisplay = React.forwardRef(
    (
        {
            prefix,
            suffix,
            selectedItems = [],
            isMultiple,
            onDeselect,
            disabled,
            placeholder,
            shouldFloatLabel,
            size,
            onClick,
            isFocused,
            error,
            centerAligned,
            iconOnly,
            plainLabel = false,
            clearable = false,
            showTickIcon = true,
            labelKey,
            valueKey,
            displaySelectedValue,
            numbered = false,
        },
        ref
    ) => {
        const hasValue = selectedItems?.length > 0;
        const [visibleCount, setVisibleCount] = React.useState(selectedItems?.length || 1);
        const tagsContainerRef = React.useRef(null);

        // Calculate visible tags based on container width
        React.useEffect(() => {
            if (!tagsContainerRef.current || !selectedItems?.length) {
                setVisibleCount(selectedItems?.length || 0);
                return;
            }

            // Get the parent container width (input wrapper)
            const parentContainer = tagsContainerRef.current.closest(
                '.onehaul-custom-input-content'
            );
            if (!parentContainer) return;

            const containerWidth = parentContainer.offsetWidth;

            // Account for suffix width (dropdown arrow + any custom suffix)
            const suffixElement = parentContainer.querySelector('.onehaul-custom-input-suffix');
            const suffixWidth = suffixElement ? suffixElement.offsetWidth + 12 : 40; // Default space for dropdown arrow

            // Account for prefix width if exists
            const prefixElement = parentContainer.querySelector('.onehaul-custom-input-prefix');
            const prefixWidth = prefixElement ? prefixElement.offsetWidth + 8 : 0;

            // Reserve space for overflow counter (+N) when needed
            const overflowCounterWidth = 50; // Space needed for "+N" tag

            // Calculate available width for tags (leave some padding)
            const baseAvailableWidth = containerWidth - prefixWidth - suffixWidth - 16; // 16px padding

            let currentWidth = 0;
            let visibleCount = 0;

            // Create temporary div to measure tag widths with actual styles
            const tempDiv = document.createElement('div');
            tempDiv.style.cssText = `
                visibility: hidden;
                position: absolute;
                display: inline-flex;
                align-items: center;
                gap: 4px;
                font-size: 12px;
                line-height: 1.4;
                white-space: nowrap;
                padding: 4px 12px;
                margin: 2px;
                background: var(--theme-color-primary-20);
                border: none;
                border-radius: 16px;
                color: var(--theme-color-grey-100);
                font-weight: 500;
            `;
            document.body.appendChild(tempDiv);

            // Test if we can fit all tags without overflow counter
            let canFitAll = true;
            let totalWidthNeeded = 0;

            // First pass: calculate total width needed for all tags
            for (let i = 0; i < selectedItems.length; i++) {
                const item = selectedItems[i];

                // Create actual tag structure including close button
                tempDiv.innerHTML = `
                    ${
                        item.prefix
                            ? `<span style="margin-right: 4px; font-size: 12px;">${item.prefix}</span>`
                            : ''
                    }
                    <span style="max-width: 150px; overflow: hidden; text-overflow: ellipsis; font-size: 12px; font-weight: 500;">${
                        item[labelKey]
                    }</span>
                    ${
                        item.suffix
                            ? `<span style="margin-left: 4px; font-size: 12px;">${item.suffix}</span>`
                            : ''
                    }
                    <span style="margin-left: 4px; font-size: 14px;">✕</span>
                `;

                const tagWidth = tempDiv.offsetWidth + 8; // 8px for margin between tags
                totalWidthNeeded += tagWidth;
            }

            // Check if all tags fit without overflow counter
            if (totalWidthNeeded <= baseAvailableWidth) {
                // All tags fit
                visibleCount = selectedItems.length;
            } else {
                // Need overflow counter - reduce available width
                const availableWidthWithOverflow = baseAvailableWidth - overflowCounterWidth;

                // Second pass: find how many tags we can show with overflow counter
                currentWidth = 0;
                for (let i = 0; i < selectedItems.length; i++) {
                    const item = selectedItems[i];

                    tempDiv.innerHTML = `
                        ${
                            item.prefix
                                ? `<span style="margin-right: 4px; font-size: 12px;">${item.prefix}</span>`
                                : ''
                        }
                        <span style="max-width: 150px; overflow: hidden; text-overflow: ellipsis; font-size: 12px; font-weight: 500;">${
                            item[labelKey]
                        }</span>
                        ${
                            item.suffix
                                ? `<span style="margin-left: 4px; font-size: 12px;">${item.suffix}</span>`
                                : ''
                        }
                        <span style="margin-left: 4px; font-size: 14px;">✕</span>
                    `;

                    const tagWidth = tempDiv.offsetWidth + 8;

                    if (currentWidth + tagWidth <= availableWidthWithOverflow) {
                        currentWidth += tagWidth;
                        visibleCount++;
                    } else {
                        break;
                    }
                }

                if (visibleCount === 0 && selectedItems.length > 0) {
                    visibleCount = 0;
                }
            }

            document.body.removeChild(tempDiv);
            setVisibleCount(Math.max(0, visibleCount));
        }, [selectedItems, prefix, suffix]);

        const visibleTags = selectedItems?.slice(0, visibleCount || 1);
        const hiddenCount = selectedItems?.length - visibleCount;

        const renderSuffix = () => {
            const elements = [];

            if (clearable && hasValue && plainLabel && !isMultiple && !disabled) {
                elements.push(
                    <span
                        key="clear-icon"
                        className="onehaul-select-plain-label-clear"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeselect();
                        }}
                    >
                        <Fail
                            style={{
                                fontSize: '14px',
                                color: 'var(--theme-color-grey-40)',
                            }}
                        />
                    </span>
                );
            }

            if (suffix) {
                elements.push(
                    <span key="original-suffix" className="onehaul-select-original-suffix">
                        {suffix}
                    </span>
                );
            }

            if (showTickIcon) {
                elements.push(
                    <Chevrondown
                        key="tick-icon"
                        style={{
                            fontSize: '16px',
                            color: 'var(--theme-color-grey-100)',
                            transition: 'color 0.2s ease',
                        }}
                    />
                );
            }

            return elements.length > 0 ? (
                <div className="onehaul-custom-input-suffix">{elements}</div>
            ) : null;
        };

        // If in icon-only mode, just render the icon
        if (iconOnly) {
            return (
                <div
                    ref={ref}
                    className={`onehaul-custom-input onehaul-icon-only ${
                        disabled ? 'disabled' : ''
                    } 
                    onehaul-input-wrapper-primary 
                    onehaul-input-${size}
                    ${isFocused ? 'focused' : ''}
                    ${error ? 'has-error' : ''}`}
                    onClick={onClick}
                >
                    <div className="onehaul-custom-input-content">
                        <div className="onehaul-custom-input-prefix">{prefix}</div>
                        {renderSuffix()}
                    </div>
                </div>
            );
        }

        return (
            <div
                ref={ref}
                className={`onehaul-custom-input ${
                    disabled ? ' disabled' : ''
                } onehaul-input-wrapper-primary onehaul-input-${size}${
                    hasValue ? ' has-value' : ''
                }${isFocused ? ' focused' : ''}${error ? ' has-error' : ''}${
                    centerAligned ? ' center-aligned' : ''
                }`}
                onClick={onClick}
            >
                <div className="onehaul-custom-input-content">
                    <>
                        {prefix && <div className="onehaul-custom-input-prefix">{prefix}</div>}
                        {!centerAligned && (
                            <>
                                <div className="onehaul-select-tags" ref={tagsContainerRef}>
                                    {plainLabel && !isMultiple ? (
                                        // Render plain text for single mode when plainLabel is true
                                        <>
                                            {displaySelectedValue ? (
                                                <div className="onehaul-select-plain-label-display-selected-value">
                                                    {displaySelectedValue}
                                                </div>
                                            ) : (
                                                <>
                                                    {selectedItems?.length > 0 && (
                                                        <div className="onehaul-select-plain-label">
                                                            <Text
                                                                variant={
                                                                    size === 'md'
                                                                        ? 'caption'
                                                                        : 'body'
                                                                }
                                                                size={'sm'}
                                                            >
                                                                {selectedItems[0][labelKey]}
                                                            </Text>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </>
                                    ) : // Render tags or count based on available space
                                    isMultiple ? (
                                        // Show individual tags
                                        visibleTags.map((item, index) => (
                                            <Tag
                                                className={`onehaul-select-tag ${
                                                    item.custom ? 'onehaul-select-custom-tag' : ''
                                                }`}
                                                key={item[valueKey]}
                                                closable={!disabled && !item.disabled}
                                                onClose={(e) => {
                                                    e.stopPropagation();
                                                    if (isMultiple) {
                                                        onDeselect(index);
                                                    } else {
                                                        onDeselect();
                                                    }
                                                }}
                                                closeIcon={
                                                    <Fail
                                                        style={{
                                                            fontSize: '14px',
                                                            color: 'var(--theme-color-grey-100)',
                                                        }}
                                                    />
                                                }
                                            >
                                                <Text
                                                    variant={size === 'md' ? 'caption' : 'body'}
                                                    size={'sm'}
                                                    weight="medium"
                                                    className="onehaul-select-tag-content-text"
                                                >
                                                    {isMultiple && numbered && `${index + 1}. `}
                                                    {item[labelKey]}
                                                </Text>
                                            </Tag>
                                        ))
                                    ) : (
                                        // Show only count when no tags fit
                                        selectedItems?.length > 0 && (
                                            <Tag className="onehaul-select-count-tag">
                                                <Text
                                                    variant={size === 'md' ? 'caption' : 'body'}
                                                    size={'sm'}
                                                    weight="medium"
                                                >
                                                    {selectedItems.length} item
                                                    {selectedItems.length === 1 ? '' : 's'} selected
                                                </Text>
                                            </Tag>
                                        )
                                    )}
                                </div>
                                {hiddenCount > 0 && isMultiple && (
                                    <div className="onehaul-select-overflow-wrapper">
                                        <Tag className="onehaul-select-overflow-tag">
                                            +{hiddenCount}
                                        </Tag>
                                    </div>
                                )}
                            </>
                        )}
                    </>

                    {placeholder &&
                        (selectedItems?.length === 0 || shouldFloatLabel || centerAligned) && (
                            <label
                                className={`onehaul-input-label${
                                    shouldFloatLabel && !centerAligned ? ' floated' : ''
                                }${error ? ' error' : ''}`}
                            >
                                {selectedItems?.length > 0 && centerAligned
                                    ? selectedItems[0][labelKey]
                                    : placeholder}
                            </label>
                        )}
                    {renderSuffix()}
                </div>
            </div>
        );
    }
);

const Select = ({
    placeholder,
    size = 'md',
    options: propOptions = [],
    disabled,
    value,
    displaySelectedContent,
    onChange,
    mode,
    prefix,
    suffix,
    helperText,
    className,
    showCount,
    maxLength,
    onSearchLoad = () => {},
    onFocusLoad = () => {},
    error = '',
    floatLabel = true,
    centerAligned = false,
    iconOnly = false,
    hideSearch = false,
    plainLabel = true,
    clearable = true,
    showTickIcon = true,
    loadOnMount = false,
    cacheOptions = false,
    cacheTimeout = 5 * 60 * 1000,
    cacheKey,
    searchThreshold = 0,
    onCacheHit,
    onCacheMiss,
    defaultOpen = false,
    onScrollEnd,
    hasMore = false,
    pageSize = 10,
    scrollThreshold = 0,
    isAsync = false,
    loading,
    labelKey = 'label',
    valueKey = 'value',
    subLabelKey = 'subLabel',
    renderLabel,
    displaySelectedValue,
    dropdownProps = {},
    numbered = false,
    creatable = false,
    showOptionTooltip = false,
    mandatory = false,
    searchQuery = '',
    ...props
}) => {
    const [loaderElement, setLoaderElement] = useState(null);

    const validSize = size === 'lg' ? 'lg' : 'md';

    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState(searchQuery);
    const [optionsCache, setOptionsCache] = useState(new Map());
    const [createdOptions, setCreatedOptions] = useState([]);

    const searchInputRef = useRef(null);
    const optionsContainerRef = useRef(null);

    const hasClickLoad = onFocusLoad !== undefined && typeof onFocusLoad === 'function';

    const selectedItems = useMemo(() => {
        if (!value) return [];
        const values = Array.isArray(value) ? value : [value];

        return values.map((v) => {
            const existingOption = [...propOptions, ...createdOptions].find(
                (opt) => opt[valueKey] === v
            );
            if (existingOption) return existingOption;

            return {};
        });
    }, [value, propOptions, createdOptions]);

    const handleSearch = useCallback(
        (value) => {
            setSearchValue(value);

            const meetsThreshold = value.trim().length >= searchThreshold;

            if (meetsThreshold || value.trim() === '') {
                onSearchLoad(value);
            }
        },
        [onSearchLoad, searchThreshold]
    );

    const filteredOptions = useMemo(() => {
        const meetsThreshold = searchValue?.trim().length >= searchThreshold;
        let baseOptions = Array.isArray(propOptions) ? propOptions : [];

        if (searchValue && !isAsync && meetsThreshold) {
            const searchLower = searchValue.toLowerCase();

            const filterItem = (item) => {
                return Object.values(item).some((val) =>
                    String(val).toLowerCase().includes(searchLower)
                );
            };

            return baseOptions.filter(filterItem);
        }

        return baseOptions;
    }, [propOptions, searchValue, isAsync, searchThreshold]);

    const handleDeselect = useCallback(
        (index) => {
            if (mode === 'multiple') {
                const newValue = Array.isArray(value) ? value.filter((_, i) => i !== index) : [];
                onChange?.(newValue);
            } else {
                onChange?.('');
            }
        },
        [mode, value, onChange]
    );

    const handleClickLoad = useCallback(
        async (params = null) => {
            if (!hasClickLoad) return;
            onFocusLoad(params);
        },
        [onFocusLoad, hasClickLoad]
    );

    useEffect(() => {
        if (defaultOpen && !disabled) {
            setIsOpen(true);
            setIsFocused(true);

            if (hasClickLoad) {
                handleClickLoad();
            }
        }
    }, [defaultOpen, disabled]);

    useEffect(() => {
        if (isOpen && !hideSearch && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    }, [isOpen, hideSearch]);

    const handleInputClick = useCallback(
        async (e) => {
            if (disabled) return;

            const newOpenState = !isOpen;
            setIsOpen(newOpenState);
            setIsFocused(newOpenState);

            if (newOpenState && hasClickLoad) {
                await handleClickLoad();
            }

            props.onClick?.(e);
        },
        [disabled, isOpen, hasClickLoad, handleClickLoad, props]
    );

    const handleDropdownOpenChange = useCallback(
        async (open) => {
            if (disabled) return;

            setIsOpen(open);

            if (open) {
                setIsFocused(true);

                if (hasClickLoad) {
                    onFocusLoad();
                }
            } else {
                setIsFocused(false);
                props.onBlur?.({});
            }
        },
        [disabled, hasClickLoad, props, onFocusLoad]
    );

    useEffect(() => {
        if (!loaderElement || !isOpen) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && !loading && hasMore) {
                    onScrollEnd();
                    if (optionsContainerRef.current) {
                        optionsContainerRef.current.scrollTo({
                            top: optionsContainerRef.current.scrollTop - 50,
                        });
                    }
                }
            },
            { root: optionsContainerRef.current, rootMargin: '10px', threshold: 0.1 }
        );

        observer.observe(loaderElement);

        return () => observer.disconnect();
    }, [loaderElement, onScrollEnd, loading, hasMore, isOpen]);

    const allOptions = useMemo(() => {
        return [...filteredOptions, ...createdOptions];
    }, [filteredOptions, createdOptions]);

    const canCreateNew = useMemo(() => {
        if (!searchValue || !creatable) return false;

        return !allOptions.some(
            (option) => option[labelKey]?.toLowerCase() === searchValue?.toLowerCase()
        );
    }, [searchValue, allOptions, labelKey, creatable]);

    const handleCreateNew = () => {
        if (!canCreateNew) return;

        if (mode === 'multiple') {
            onChange?.([...(value || []), searchValue]);
        } else {
            onChange?.(searchValue);
        }

        setSearchValue('');
        setIsOpen(false);
        setIsFocused(false);
        setCreatedOptions((prev) => [
            ...prev,
            { [labelKey]: searchValue, [valueKey]: searchValue, suffix: 'Custom', custom: true },
        ]);
    };

    const dropdownContent = (
        <div
            className={`onehaul-select-dropdown ${
                displaySelectedContent ? 'display-selected-content' : ''
            }`}
        >
            {!hideSearch && (
                <div
                    className={`onehaul-select-search ${
                        displaySelectedContent ? 'onehaul-display-selected-select-search' : ''
                    }`}
                >
                    {displaySelectedContent && (
                        <div className="onehaul-select-display-selected-content-wrapper">
                            <div className="onehaul-select-display-selected-content">
                                {displaySelectedContent}
                            </div>
                        </div>
                    )}

                    <div
                        className={`onehaul-select-search-input-wrapper ${
                            displaySelectedContent
                                ? 'onehaul-display-async-content-search-input-wrapper'
                                : ''
                        }`}
                    >
                        <AntInput
                            ref={searchInputRef}
                            placeholder="Search"
                            prefix={loading ? <LoadingOutlined /> : <Search />}
                            value={searchValue}
                            className={`onehaul-select-search-input ${
                                displaySelectedContent ? 'display-selected-content' : ''
                            }`}
                            onChange={(e) => handleSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();

                                    if (canCreateNew) {
                                        handleCreateNew();
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            )}
            <div
                className={`onehaul-select-options ${
                    !displaySelectedContent ? 'onehaul-display-selected-select-options' : ''
                }`}
                ref={optionsContainerRef}
            >
                {loading && allOptions.length === 0 ? (
                    <div className="onehaul-select-loading">
                        <LoadingOutlined />
                    </div>
                ) : !Array.isArray(allOptions) || allOptions.length === 0 ? (
                    <div className="onehaul-select-empty">No options found</div>
                ) : (
                    <div
                        className={`onehaul-select-options-wrapper ${
                            displaySelectedContent
                                ? 'onehaul-display-async-content-options-wrapper'
                                : ''
                        } ${
                            size === 'md'
                                ? 'onehaul-select-options-wrapper-md'
                                : 'onehaul-select-options-wrapper-lg'
                        }`}
                    >
                        {allOptions.map((option) => {
                            const isSelected = Array.isArray(value)
                                ? value.includes(option[valueKey])
                                : value === option[valueKey];

                            return (
                                <div
                                    key={option[valueKey]}
                                    className={`onehaul-select-option-item ${
                                        isSelected ? 'selected' : ''
                                    } ${option.disabled ? 'disabled' : ''} ${
                                        displaySelectedContent ? 'display-selected-content' : ''
                                    }`}
                                    onClick={() => {
                                        if (option.disabled) return;

                                        if (mode === 'multiple') {
                                            const newValue = Array.isArray(value) ? [...value] : [];
                                            const index = newValue.indexOf(option[valueKey]);
                                            if (index === -1) {
                                                newValue.push(option[valueKey]);
                                            } else {
                                                newValue.splice(index, 1);
                                            }
                                            onChange?.(newValue);
                                        } else {
                                            onChange?.(option[valueKey]);
                                            setIsOpen(false);
                                            setIsFocused(false);
                                        }
                                    }}
                                >
                                    {mode === 'multiple' && (
                                        <Checkbox
                                            checked={
                                                Array.isArray(value)
                                                    ? value.includes(option[valueKey])
                                                    : false
                                            }
                                            disabled={option.disabled}
                                        />
                                    )}
                                    <div
                                        className={`onehaul-select-option-content ${
                                            (option[subLabelKey] || displaySelectedValue) &&
                                            'onehaul-select-option-content-sublebel'
                                        } `}
                                    >
                                        {option.prefix && (
                                            <span className="onehaul-select-option-prefix">
                                                {option.prefix}
                                            </span>
                                        )}

                                        <div
                                            title={
                                                showOptionTooltip &&
                                                typeof renderLabel !== 'function'
                                                    ? option[labelKey]
                                                    : ''
                                            }
                                            className="onehaul-select-option-label"
                                        >
                                            {typeof renderLabel !== 'function'
                                                ? option[labelKey]
                                                : renderLabel(option, isSelected)}
                                        </div>

                                        <div className={`onehaul-select-option-sub-label`}>
                                            {option[subLabelKey] && (
                                                <Text
                                                    style={{ marginTop: 2 }}
                                                    type="secondary"
                                                    size="sm"
                                                >
                                                    {option[subLabelKey]}
                                                </Text>
                                            )}
                                        </div>

                                        {option.suffix && (
                                            <span className="onehaul-select-option-suffix">
                                                {option.suffix}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {hasMore && allOptions.length > 0 && (
                    <div ref={setLoaderElement} className="onehaul-select-loading-more">
                        <LoadingOutlined />
                        <span>Loading more...</span>
                    </div>
                )}
            </div>

            {canCreateNew && (
                <div className="onehaul-select-dropdown-footer-wrapper">
                    <div
                        className={`onehaul-select-dropdown-footer ${
                            mode === 'multiple' ? 'border-top' : ''
                        }`}
                    >
                        <Button variant="link" icon={<Add />} onClick={handleCreateNew}>
                            Create "{searchValue}"
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );

    let shouldFloatLabel = false;

    if (floatLabel && !centerAligned) {
        if (mode === 'multiple') {
            shouldFloatLabel = (value || [])?.length > 0 || isOpen;
        } else {
            shouldFloatLabel = value || isOpen;
        }
    }

    useEffect(() => {
        if (!cacheOptions) return;

        const cleanupInterval = setInterval(() => {
            const now = Date.now();
            const expiredKeys = [];

            optionsCache.forEach((value, key) => {
                if (now - value.timestamp > cacheTimeout) {
                    expiredKeys.push(key);
                }
            });

            if (expiredKeys.length > 0) {
                setOptionsCache((prev) => {
                    const newCache = new Map(prev);
                    expiredKeys.forEach((key) => newCache.delete(key));
                    return newCache;
                });
            }
        }, 60000);

        return () => clearInterval(cleanupInterval);
    }, [optionsCache, cacheOptions, cacheTimeout]);

    useEffect(() => {
        if (mode === 'multiple' || !mandatory) return;
        if (filteredOptions.length !== 1) return;
        if (value) return;

        const [onlyOption] = filteredOptions;
        if (onlyOption.disabled) return;

        onChange?.(onlyOption[valueKey]);
    }, [filteredOptions, onChange]);

    return (
        <div className={`onehaul-select-wrapper ${className || ''}`} id={props.id}>
            <Dropdown
                open={isOpen}
                onOpenChange={handleDropdownOpenChange}
                trigger={['click']}
                popupRender={() => dropdownContent}
                overlayClassName="onehaul-select-dropdown-wrapper"
                zIndex={2000}
                overlayStyle={{
                    width: 'auto',
                    minWidth: '100%',
                    maxWidth: '100%',
                }}
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
                {...(dropdownProps || {})}
            >
                <CustomInputDisplay
                    selectedItems={selectedItems}
                    isMultiple={mode === 'multiple'}
                    onDeselect={handleDeselect}
                    prefix={prefix}
                    suffix={suffix}
                    disabled={disabled}
                    placeholder={placeholder}
                    shouldFloatLabel={shouldFloatLabel}
                    size={validSize}
                    isFocused={isFocused}
                    error={error}
                    centerAligned={centerAligned}
                    iconOnly={iconOnly}
                    plainLabel={plainLabel}
                    showTickIcon={showTickIcon}
                    onClick={handleInputClick}
                    clearable={clearable}
                    labelKey={labelKey}
                    valueKey={valueKey}
                    numbered={numbered}
                    displaySelectedValue={displaySelectedValue}
                />
            </Dropdown>
            {helperText && (
                <div className={`onehaul-custom-input-helper-text ${error ? 'error' : ''}`}>
                    {error}
                    {helperText}
                </div>
            )}
            {error && !helperText ? (
                <div className="onehaul-custom-input-helper-text error">{error}</div>
            ) : null}
        </div>
    );
};

export default Select;
