import { useState } from "react";

interface SearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  collapsible?: boolean;
  expanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  onClear?: () => void;
}

const SearchField = ({
  collapsible = false,
  expanded = false,
  value,
  onToggle,
  onClear,
  ...inputProps
}: SearchFieldProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const actuallyExpanded = collapsible ? expanded : isExpanded;

  const handleToggle = (newExpanded: boolean) => {
    if (collapsible) {
      onToggle?.(newExpanded);
    } else {
      setIsExpanded(newExpanded);
    }
  };

  if (!collapsible) {
    return (
      <div className="flex relative">
        <input
          className="flex rounded-sm border border-gray-800 transition focus:border-primary-500 bg-background px-2 py-1 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 w-full"
          placeholder="Search"
          value={value}
          {...inputProps}
        />
      </div>
    );
  }

  if (actuallyExpanded) {
    return (
      <div className="flex items-center gap-2 w-full">
        <input
          className="flex rounded-sm border border-gray-800 transition focus:border-primary-500 bg-background px-2 py-1 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 flex-1"
          placeholder="Search"
          autoFocus
          value={value}
          {...inputProps}
        />
        <button
          onClick={() => {
            // Clear search immediately using the custom clear function
            if (onClear) {
              onClear();
            } else if (inputProps.onChange) {
              // Fallback to the original method
              inputProps.onChange({
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>);
            }
            // Then toggle the state
            handleToggle(false);
          }}
          className="flex items-center justify-center p-2 rounded-sm border border-gray-800 bg-background hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400 flex-shrink-0"
          type="button"
          title="Close search"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => handleToggle(true)}
      className="flex items-center justify-center p-2 rounded-sm border border-gray-800 bg-background hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400 flex-shrink-0"
      type="button"
      title="Open search"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  );
};

export default SearchField;
