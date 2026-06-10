import React from "react";

export interface SelectOption {
  value: any;
  label: React.ReactNode;
  disabled?: boolean;
  title?: string;
  suffix?: React.ReactNode;
}

export interface SelectProps {
  id?: string;
  label?: string;
  value?: any;
  defaultValue?: any;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
  filterOption?: boolean | ((input: string, option: any) => boolean);
  mode?: "single" | "multiple";
  size?: "md" | "lg";
  maxTagCount?: number | "responsive";
  options?: SelectOption[];
  onChange?: (value: any, option?: any) => void;
  onSelect?: (value: any, option: any) => void;
  onDeselect?: (value: any, option: any) => void;
  onSearch?: (value: string) => void;
  onFocus?: (e: React.FocusEvent) => void;
  onBlur?: (e: React.FocusEvent) => void;
  className?: string;
  style?: React.CSSProperties;
  dropdownStyle?: React.CSSProperties;
  children?: React.ReactNode;
  helperText?: string;
  error?: boolean;
  debounceTimeout?: number;
  type?: "primary" | "secondary";
  fetchOptions?: (search: string) => Promise<SelectOption[]>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  showTickIcon?: boolean;
  plainLabel?: boolean;
  plainLabelClearable?: boolean;
  
  // Enhanced async props - functions can handle their own parameters internally
  onFocusLoad?: (params?: any) => Promise<SelectOption[]>;
  onSearchLoad?: (searchValue: string) => Promise<SelectOption[]>;
  loadOnMount?: boolean;
  cacheOptions?: boolean;
  searchThreshold?: number;
  
  // Cache-related props
  cacheTimeout?: number; // Cache timeout in milliseconds
  cacheKey?: string; // Custom cache key for this instance
  
  // Utility functions (optional - for debugging/monitoring)
  onCacheHit?: (key: string, data: any) => void;
  onCacheMiss?: (key: string) => void;
  
  /**
   * Callback triggered when scrolling reaches near the bottom of the dropdown
   * Returns a promise that resolves when the loading is complete
   * @param event The scroll event
   */
  onScrollEnd?: (event: React.UIEvent<HTMLDivElement>) => Promise<any> | any;
  
  /**
   * Distance from the bottom (in pixels) to trigger onScrollEnd
   * @default 50
   */
  scrollThreshold?: number;
}

export interface SelectOptionProps {
  value: any;
  disabled?: boolean;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

interface SelectComponent extends React.FC<SelectProps> {
  /**
   * OneHaul Select component
   *
   * @example
   * ```jsx
   * <Select
   *   placeholder="Select option"
   *   value={selectedValue}
   *   onChange={handleChange}
   *   options={options}
   *   onFocusLoad={(params) => loadUsersWithParams(params)}
   *   onSearchLoad={(searchTerm) => searchProductsWithParams(searchTerm, { category: 'electronics' })}
   *   cacheOptions={true}
   *   onCacheHit={(key, data) => console.log(`Cache hit: ${key}`)}
   *   onCacheMiss={(key) => console.log(`Cache miss: ${key}`)}
   * />
   * ```
   */
  Option: React.FC<SelectOptionProps>;
}

declare const Select: SelectComponent;
export default Select;
