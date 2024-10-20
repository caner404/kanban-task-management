import { ComponentProps } from 'react';

type LabelProps = ComponentProps<'label'>;
export function Label({ ...props }: LabelProps) {
  return (
    <label className="text-neutral text-sm" {...props}>
      {props.children}
    </label>
  );
}
