import { ComponentProps, forwardRef } from 'react';
import { Input } from './Input';
import { Label } from './Label';

type TextboxLabelProps = { label: string; id: string };
type TextboxProps = ComponentProps<'input'> & TextboxLabelProps;

export const Textbox = forwardRef<HTMLInputElement, TextboxProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor={id}>{label}</Label>
        <Input
          {...props}
          ref={ref}
          id={id}
          placeholder={props.placeholder}
          type="text"
          className={`${props.className} rounded border border-neutral border-opacity-25 px-4 py-2 text-base placeholder:opacity-25 text-black dark:bg-neutral-dark dark:text-neutral `}
        />
      </div>
    );
  },
);
