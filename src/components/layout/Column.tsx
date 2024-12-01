import { Task, TaskCard, TaskDetails } from '@/features/tasks';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import Modal from '../Modal';

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
          <Modal.Root key={task.id}>
            <Modal.Open opens="task-details">
              <TaskCard task={task} className="m-5" />
            </Modal.Open>
            <Modal.Window name="task-details">
              <TaskDetails task={task} />
            </Modal.Window>
          </Modal.Root>
        ))}
      </div>
    </div>
  );
}

export default Columns;
