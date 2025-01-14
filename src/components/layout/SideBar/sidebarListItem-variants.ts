import { cva, type VariantProps } from 'class-variance-authority';

export const sidebarListItemVariants = {
  default: [
    'text-neutral',
    'hover:text-primary',
    'hover:bg-neutral-light',
    'group-hover:text-primary',
    'group-hover:fill-primary',
  ],
  create: ['text-primary'],
  active: ['text-white', 'bg-primary'],
} as const;

export type SidebarListItemVariantKeys = keyof typeof sidebarListItemVariants;

export const variants = cva(
  ['flex', 'items-center', 'gap-4', 'py-4', 'pl-8', 'text-md'],
  {
    variants: {
      variant: sidebarListItemVariants,
    },
  },
);

export type SidebarListItemVariants = VariantProps<typeof variants>;
