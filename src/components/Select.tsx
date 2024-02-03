import { Portal, normalizeProps, useMachine } from '@zag-js/react';
import * as select from '@zag-js/select';
import { useId } from 'react';
import { SelectOptionType } from '../types';

type SelectProps<T> = Omit<select.Context<T>, 'id' | 'value' | 'collection'> & {
  label: string;
  items: SelectOptionType[];
  value: string;
};

export const Select = (props: SelectProps<SelectOptionType>) => {
  const { items, label, value, ...contextProps } = props;
  const collection = select.collection({
    items,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
  });

  const [state, send] = useMachine(
    select.machine({
      id: useId(),
      collection,
      selectOnBlur: true,
    }),
    {
      context: { value: value ? [value] : [items[0].value], ...contextProps },
    }
  );

  const api = select.connect(state, send, normalizeProps);

  return (
    <div {...api.rootProps}>
      <div {...api.controlProps} className="flex gap-2 items-center">
        <label {...api.labelProps} className="text-xs">
          {label}
        </label>
        <button
          {...api.triggerProps}
          className="rounded-sm transition flex gap-4 items-center px-2 py-1 text-xs border border-gray-800 hover:border-primary-600 focus:border-primary-600 disabled:opacity-70 dark:disabled:hover:border-gray-800 disabled:hover:text-current disabled:cursor-not-allowed"
        >
          {api.valueAsString || 'Select option'}
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
          </svg>
        </button>
      </div>

      <Portal>
        <div
          {...api.positionerProps}
          className="z-50 text-xs bg-gray-800 border border-gray-800 rounded-sm"
        >
          <ul {...api.contentProps} className="">
            {items.map((item) => (
              <li
                key={item.value}
                {...api.getItemProps({ item })}
                className="transition rounded-sm px-2 py-1 flex justify-between gap-4 cursor-pointer border dark:hover:border-primary-600 border-gray-800"
              >
                <span>{item.label}</span>
                <span {...api.getItemIndicatorProps({ item })}>✓</span>
              </li>
            ))}
          </ul>
        </div>
      </Portal>
    </div>
  );
};
