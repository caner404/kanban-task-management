import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = {
  primary: ['bg-primary', 'text-white'],
  secondary: [
    'bg-white',
    'text-slate-900',
    'border-slate-300',
    'hover:bg-slate-50',
    'active:bg-slate-100',
  ],
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

const variantConfig = {
  variant: buttonVariants,
  size: sizes,
  disabled: {
    true: ['opacity-25', 'cursor-not-allowed'],
  },
};

export const variants = cva(
  ['border', 'rounded-3xl', 'cursor-pointer', 'text-md'],
  {
    variants: variantConfig,
  },
);

export type ButtonVariants = VariantProps<typeof variants>;
