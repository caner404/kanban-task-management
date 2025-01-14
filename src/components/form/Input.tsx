import { ComponentProps, forwardRef } from 'react';

type InputProps = ComponentProps<'input'> & {
  errorMessage?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <div
      className={`${props.errorMessage ? 'border-danger' : ''} flex w-full items-center rounded border border-neutral outline-none hover:border-primary
       active:border-primary border-opacity-25 px-4 py-2 text-base placeholder:opacity-25 text-black dark:bg-neutral-dark dark:text-neutral`}
    >
      <input
        {...props}
        ref={ref}
        placeholder={props.placeholder}
        type="text"
        className={`border-none outline-none flex-1 dark:bg-neutral-dark  ${props.className}`}
      />
      {props.errorMessage && (
        <span className="text-danger">{props.errorMessage}</span>
      )}
    </div>
  );
});
