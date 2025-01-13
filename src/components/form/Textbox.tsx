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
        />
      </div>
    );
  },
);
