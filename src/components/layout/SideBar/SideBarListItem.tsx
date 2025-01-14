import { IconBoard } from '@/assets';
import { ComponentProps } from 'react';
import { SidebarListItemVariants, variants } from './sidebarListItem-variants';

export type SidebarListItemProps = ComponentProps<'li'> &
  SidebarListItemVariants & {
    children?: React.ReactNode;
    onClick?: () => void;
  };

export function SidebarListItem({
  title,
  variant = 'default',
  children,
  onClick,
  ...props
}: SidebarListItemProps) {
  return (
    <li
      tabIndex={0}
      {...props}
      role="button"
      className={`${props.className} ${variants({ variant })} group rounded-tr-full rounded-br-full hover:cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-500 `}
      onClick={onClick}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {children || <IconBoard />}
      {title}
    </li>
  );
}
