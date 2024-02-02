import * as progress from '@zag-js/progress';
import { normalizeProps, useMachine } from '@zag-js/react';
import { useId } from 'react';

interface ProgressProps {
  isIntermediate?: boolean;
  value?: number;
  label?: string;
}

export const Progress = ({
  isIntermediate = false,
  value = 0,
  label,
}: ProgressProps) => {
  const [state, send] = useMachine(progress.machine({ id: useId() }), {
    context: { value: isIntermediate ? null : value },
  });

  const api = progress.connect(state, send, normalizeProps);

  return (
    <div {...api.rootProps}>
      {label ? <div {...api.labelProps}>{label} </div> : null}
      <div {...api.trackProps} className="h-[2px]">
        <div
          {...api.rangeProps}
          className="bg-primary-600 -translate-x-full h-full animate-progress w-[210%]"
        />
      </div>
    </div>
  );
};
