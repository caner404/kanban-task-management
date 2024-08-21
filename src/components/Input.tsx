import { ComponentProps } from 'react';

type InputProps = ComponentProps<'input'>;
export function Input(props: InputProps) {
  return (
    <input
      {...props}
      placeholder={props.placeholder}
      type="text"
      className={`${props.className} rounded border border-neutral border-opacity-25 px-4 py-2 text-base placeholder:opacity-25 text-black`}
    />
  );
}
