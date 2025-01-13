import { ComponentProps, forwardRef } from 'react';
import { Label } from './Label';

type TextareaProps = ComponentProps<'textarea'> & { label: string; id: string };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <Label id="textarea-lbl">{label}</Label>
        <textarea
          {...props}
          ref={ref}
          id={id}
          placeholder={props.placeholder}
          aria-labelledby="textarea-lbl"
          className={`resize-none rounded border border-neutral border-opacity-25 px-4 py-2 text-base placeholder:opacity-25 text-black h-28 dark:bg-neutral-dark dark:text-neutral`}
        />
      </div>
    );
  },
);
