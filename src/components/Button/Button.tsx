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
    <button className={variants({ variant, size, disabled })} {...props}>
      {props.children}
    </button>
  );
};
