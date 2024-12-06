import { ComponentProps } from 'react';
import { ButtonVariants, variants } from './button-variants';

export type ButtonProps = ComponentProps<'button'> &
  ButtonVariants & {
    children: React.ReactNode;
  };
export const Button = ({
  variant = 'primary',
  size = 'small',
  disabled = false,
  children,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={`${props.className} ${variants({ variant, size, disabled })}`}
    >
      {children}
    </button>
  );
};
