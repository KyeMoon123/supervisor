import React from "react";

export interface PageHeadingActionButtonProps {
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  buttonVariant?: "default" | "outline" | "ghost" | "destructive";
  dialog?: React.ReactNode;
}

/**
 * Props for the PageWrapperProps component
 */
export interface PageWrapperProps {
  /**
   * The page heading text
   */
  pageHeading?: string;
  /**
   * The sub heading text
   */
  subHeading?: string;

  /**
   * The action buttons to display
   */
  actions?: React.ReactNode[];

  /**
   * The children to display
   */
  children: React.ReactNode;
}
/**
 * A component that displays a page heading with optional meta data and actions on the right
 * @param pageHeading
 * @param metaDataItems
 * @param actions
 * @param subHeading
 * @constructor
 */
const PageWrapper = ({
  pageHeading,
  actions,
  subHeading,
  children,
}: PageWrapperProps) => {
  return (
    <div className="p-2">
      <div className="lg:flex lg:items-center lg:justify-between mb-4 ">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
            {pageHeading}
          </h2>
          {subHeading && (
            <p className="mt-1 text-sm text-gray-500">{subHeading}</p>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 flex lg:ml-4 lg:mt-0">
          <span className="hidden sm:block space-x-2">
            {actions &&
              actions.map((action, index) => {
                return <div key={index}>{action}</div>;
              })}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};
export default PageWrapper;
