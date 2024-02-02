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
      page,
      pageSize,
      onPageChange,
    })
  );

  const api = pagination.connect(state, send, normalizeProps);

  return (
    <div className="py-4 px-5 sm:py-3 sm:px-4">
      {api.totalPages > 1 && (
        <nav {...api.rootProps}>
          <ul className="inline-flex gap-2 items-center flex-wrap">
            <li>
              <Button disabled={api.isFirstPage} {...api.prevTriggerProps}>
                Previous
              </Button>
            </li>
            {api.pages.map((page, i) => {
              if (page.type === 'page')
                return (
                  <li
                    {...api.getItemProps(page)}
                    className={`cursor-pointer text-xs px-2 py-1 md:px-3 md:py-2 border border-gray-800 h-full grid place-items-center ${
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
                  <li className="cursor-pointer" key={`ellipsis-${i}`}>
                    <span {...api.getEllipsisProps({ index: i })}>&#8230;</span>
                  </li>
                );
            })}
            <li>
              <Button disabled={api.isLastPage} {...api.nextTriggerProps}>
                Next
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
