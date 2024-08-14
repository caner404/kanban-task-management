import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'main'>;
export function Main(props: ButtonProps) {
  return (
    <main
      {...props}
      className={`${props.className} flex flex-col gap-6 justify-center items-center bg-neutral-light p-6`}
    ></main>
  );
}
