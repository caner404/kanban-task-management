import { useRef, useEffect, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Card } from '@/components/Card';
import { Task } from './types';

export function TaskCard({
  task,
  onClick,
  className,
}: {
  task: Task;
  onClick?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current as HTMLDivElement;

    return draggable({
      element: el,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
      getInitialData: () => task,
    });
  }, [task]);

  return (
    <Card
      ref={ref}
      title={task.title}
      description={`${task.subTasks.filter((subTask) => subTask.isCompleted).length} of ${task.subTasks.length} subtasks`}
      role="button"
      onClick={onClick}
      className={`${dragging ? 'bg-opacity-70' : 'bg-white'} hover:cursor-grab focus-within:cursor-grab ${className}`}
    />
  );
}
