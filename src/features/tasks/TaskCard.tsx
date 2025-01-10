import { useRef, useEffect, useState } from 'react';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Card } from '@/components/Card';
import { Task } from './types';

export function TaskCard({
  task,
  onClick,
  className,
  dataTestid,
}: {
  task: Task;
  onClick?: () => void;
  className?: string;
  dataTestid?: string;
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

  function handleOnKeydown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  }

  return (
    <li onClick={onClick} onKeyDown={handleOnKeydown}>
      <Card
        ref={ref}
        tabIndex={0}
        title={task.title}
        description={`${task.subTasks.filter((subTask) => subTask.isCompleted).length} of ${task.subTasks.length} subtasks`}
        className={`${className} ${dragging ? 'bg-opacity-70' : 'bg-white'} hover:cursor-grab `}
        dataTestid={dataTestid}
      />
    </li>
  );
}
