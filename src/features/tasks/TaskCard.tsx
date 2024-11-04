import { useRef, useEffect, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Card } from '@/components/Card';
import { Task } from './types';

export function TaskCard({
  task,
  onClick,
}: {
  task: Task;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current as HTMLDivElement;

    return draggable({
      element: el,
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
      getInitialData: () => ({ task }),
    });
  }, [task]);

  return (
    <Card
      title={task.title}
      description={`${task.subTasks.filter((subTask) => subTask.isCompleted).length} of ${task.subTasks.length} subtasks`}
      ref={ref}
      role="button"
      onClick={onClick}
      className={`${dragging ? 'bg-neutral-light' : 'bg-white'} rounded-md py-6 px-4 drop-shadow-lg`}
    />
  );
}
