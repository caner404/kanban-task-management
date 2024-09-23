import { ComponentProps, forwardRef } from 'react';
import { Label } from './Label';

type TextboxLabelProps = { label: string; id: string };
type TextboxProps = ComponentProps<'input'> & Partial<TextboxLabelProps>;

export const Textbox = forwardRef<HTMLInputElement, TextboxProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && <Label htmlFor={id}>{label}</Label>}
        <input
          {...props}
          ref={ref}
          id={id}
          placeholder={props.placeholder}
          type="text"
          className={`${props.className} rounded border border-neutral border-opacity-25 px-4 py-2 text-base placeholder:opacity-25 text-black`}
        />
      </div>
    );
  },
);
