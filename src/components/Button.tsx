import React from 'react';

const Button = ({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="font-bold rounded px-2 py-1 md:px-3 md:py-2 uppercase hover:bg-gray-900 hover:text-white inline-flex items-center transition bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-300 dark:hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-gray-200 dark:disabled:hover:bg-gray-800 disabled:hover:text-current"
      {...rest}
    >
      <div className="inline-flex items-center flex-shrink-0">
        <span className="flex items-center min-w-0 text-xs uppercase font-semibold">
          {children}
        </span>
      </div>
    </button>
  );
};

export default Button;
