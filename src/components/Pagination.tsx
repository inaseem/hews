import * as pagination from '@zag-js/pagination';
import { normalizeProps, useMachine } from '@zag-js/react';
import { useId } from 'react';
import Button from './Button';

interface PaginationProps {
  totalItems: number;
  page: number;
  pageSize: number;
  onPageChange?: (details: pagination.PageChangeDetails) => void;
}

export const Pagination = ({
  totalItems,
  page,
  pageSize,
  onPageChange,
}: PaginationProps) => {
  const id = useId();
  const [state, send] = useMachine(
    pagination.machine({
      id,
      count: totalItems,
    }),
    {
      context: {
        count: totalItems,
        page,
        pageSize,
        onPageChange,
      },
    }
  );

  const api = pagination.connect(state, send, normalizeProps);

  return (
    <div className="py-2 px-2 sm:py-3 sm:px-4">
      {api.totalPages > 1 && (
        <nav {...api.rootProps}>
          <ul className="inline-flex gap-1 items-center overflow-x-auto">
            <li className="flex-shrink-0">
              <Button disabled={api.isFirstPage} {...api.prevTriggerProps} className="text-xs px-1.5 py-1 md:px-2">
                Prev
              </Button>
            </li>
            {api.pages.map((page, i) => {
              if (page.type === 'page')
                return (
                  <li
                    {...api.getItemProps(page)}
                    className={`cursor-pointer rounded-sm transition border text-xs px-1.5 py-1 border-gray-800 hover:border-primary-600 h-full grid place-items-center min-w-[28px] flex-shrink-0 ${
                      api.page === page.value
                        ? 'bg-primary-600'
                        : 'bg-transparent'
                    }`}
                    key={page.value}
                  >
                    <span>{page.value}</span>
                  </li>
                );
              else
                return (
                  <li className="cursor-pointer px-1 flex-shrink-0" key={`ellipsis-${i}`}>
                    <span {...api.getEllipsisProps({ index: i })}>&#8230;</span>
                  </li>
                );
            })}
            <li className="flex-shrink-0">
              <Button disabled={api.isLastPage} {...api.nextTriggerProps} className="text-xs px-1.5 py-1 md:px-2">
                Next
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
