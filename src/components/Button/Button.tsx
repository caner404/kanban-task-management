import { ComponentProps } from 'react';
import { ButtonVariants, variants } from './button-variants';

type ButtonProps = ComponentProps<'button'> & ButtonVariants;
export const Button = ({
  variant = 'primary',
  size = 'small',
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      {...props}
      className={`${props.className} ${variants({ variant, size, disabled })}`}
    >
      {props.children}
    </button>
  );
};
