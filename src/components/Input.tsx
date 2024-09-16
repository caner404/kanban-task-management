import { ComponentProps, forwardRef } from 'react';

type InputProps = ComponentProps<'input'>;
// we need this so that we can call {...register("fieldName")} from outside
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      placeholder={props.placeholder}
      type="text"
      className={`${props.className} rounded border border-neutral border-opacity-25 px-4 py-2 text-base placeholder:opacity-25 text-black`}
    />
  );
});
