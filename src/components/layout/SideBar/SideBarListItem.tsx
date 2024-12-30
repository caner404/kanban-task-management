import { IconBoard } from '@/assets';
import { ComponentProps, MouseEventHandler } from 'react';
import {
  SidebarListItemVariantKeys,
  SidebarListItemVariants,
  variants,
} from './sidebarListItem-variants';

export type SidebarListItemProps = ComponentProps<'li'> &
  SidebarListItemVariants & {
    children?: React.ReactNode;
    onClick?: MouseEventHandler<HTMLDivElement>;
  };

export function SidebarListItem({
  title,
  variant = 'default',
  children,
  onClick,
}: SidebarListItemProps) {
  const fillColorValue: Record<SidebarListItemVariantKeys, string> = {
    default: '#828FA3',
    active: '#fff',
    create: '#635fc7',
  };

  return (
    <div
      className={`${variants({ variant })} hover:cursor-pointer`}
      onClick={onClick}
    >
      {children || (
        <IconBoard fillColor={fillColorValue[variant ?? 'default']} />
      )}
      <p>{title}</p>
    </div>
  );
}
