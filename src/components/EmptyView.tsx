import React from 'react';

interface EmptyViewProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
}

const EmptyView = ({ title, description, actions }: EmptyViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full max-w-sm px-4 m-auto">
      <h1 className="mt-3 text-lg text-gray-800 dark:text-white">{title}</h1>
      <p className="text-gray-500 dark:text-gray-400 text-center">
        {description}
      </p>
      {actions}
    </div>
  );
};

export default EmptyView;
