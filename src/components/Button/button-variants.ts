import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = {
  primary: ['bg-primary', 'text-white'],
  secondary: ['bg-primary', 'bg-opacity-10', 'border-none', 'text-primary'],
  inline: ['bg-transparent'],
  destructive: [
    'bg-danger-600',
    'text-white',
    'border-transparent',
    'hover:bg-danger-500',
    'active:bg-danger-400',
  ],
} as const;

export const sizes = {
  small: ['px-[18px]', 'py-[10px]'],
  medium: ['px-[17px]', 'py-[14px]'],
};

export const variants = cva(['rounded-3xl', 'cursor-pointer', 'text-md'], {
  variants: {
    variant: buttonVariants,
    size: sizes,
    disabled: {
      true: ['opacity-25', 'cursor-not-allowed'],
    },
  },
});

export type ButtonVariants = VariantProps<typeof variants>;
