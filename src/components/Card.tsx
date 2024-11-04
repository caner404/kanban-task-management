import { useRef, useEffect, useState, ComponentProps } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

export type CardProps = ComponentProps<'div'> & {
  title: string;
  description: string;
  onClick?: () => void;
};
export function Card({ title, description, onClick }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current as HTMLDivElement;

    return draggable({
      element: el,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
      getInitialData: () => ({ title }),
    });
  }, [title]);

  return (
    <div
      ref={ref}
      role="button"
      onClick={onClick}
      className={`${dragging ? 'bg-neutral-light' : 'bg-white'} rounded-md py-6 px-4 drop-shadow-lg`}
    >
      <div className="flex flex-col gap-2 hover:cursor-pointer">
        <p className="text-md">{title}</p>
        <p className="text-sm text-neutral">{description}</p>
      </div>
    </div>
  );
}
