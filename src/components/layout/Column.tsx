import { Task } from '@/features/tasks';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import { TaskModal } from '../../features/tasks/TaskModal';

function Columns({
  column,
  ...props
}: {
  column: {
    statusName: string;
    tasksByStatusId: Task[];
  } & ComponentProps<'div'>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current as HTMLDivElement;

    return dropTargetForElements({
      element: el,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
      getData: () => ({ statusName: column.statusName }),
    });
  }, [isDraggedOver, column]);

  return (
    <div className="flex flex-col gap-3 " {...props}>
      <h3 className="text-sm text-neutral uppercase">
        {column.statusName} ({column.tasksByStatusId.length})
      </h3>
      <div
        ref={ref}
        className={`${isDraggedOver ? 'bg-neutral bg-opacity-25' : ''} flex-1 w-[280px]`}
      >
        {column.tasksByStatusId.map((task) => (
          <TaskModal task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
}

export default Columns;
