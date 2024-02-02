import React from 'react';

export const PageLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="border-l border-r border-gray-800 overflow-auto flex flex-col">
      <div className="flex flex-col flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default PageLayout;
