import React from 'react';

export const PageLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="border-l border-r border-gray-800 h-full flex flex-col overflow-hidden">
      <div className="flex flex-col flex-1 min-h-0">{children}</div>
    </div>
  );
};

export default PageLayout;
