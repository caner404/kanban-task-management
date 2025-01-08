import { cva, type VariantProps } from 'class-variance-authority';

export const sidebarListItemVariants = {
  default: ['text-neutral'],
  create: ['text-primary'],
  active: ['bg-primary text-white'],
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
