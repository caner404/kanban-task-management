import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = {
  primary: ['bg-primary', 'text-white'],
  secondary: [
    'bg-primary',
    'bg-opacity-10',
    'border-none',
    'text-primary',
    'dark:bg-white',
  ],
  inline: ['bg-transparent'],
  destructive: ['bg-danger', 'text-white', 'border-transparent'],
} as const;

export const sizes = {
  small: ['px-[18px]', 'py-[10px]'],
  medium: ['px-[17px]', 'py-[14px]'],
};

export const variants = cva(
  [
    'rounded-3xl',
    'cursor-pointer',
    'text-md',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-500',
  ],
  {
    variants: {
      variant: buttonVariants,
      size: sizes,
      disabled: {
        true: ['opacity-25', 'cursor-not-allowed'],
      },
    },
  },
);

export type ButtonVariants = VariantProps<typeof variants>;
