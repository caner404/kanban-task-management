import { ComponentProps } from 'react';

type LabelProps = ComponentProps<'label'>;
export function Label({ ...props }: LabelProps) {
  return (
    <label {...props} className="text-neutral text-sm">
      {props.children}
    </label>
  );
}
