import React from 'react';

export const PageLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="border-l border-r border-gray-800 h-screen overflow-hidden flex flex-col">
      <div className="flex flex-col flex-1 overflow-hidden">{children}</div>
    </div>
  );
};

export default PageLayout;
