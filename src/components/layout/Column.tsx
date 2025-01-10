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
  const ref = useRef<HTMLUListElement>(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current as HTMLUListElement;

    return dropTargetForElements({
      element: el,
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
      getData: () => ({ statusName: column.statusName }),
    });
  }, [isDraggedOver, column]);

  return (
    <section
      className="flex flex-col gap-3 "
      {...props}
      aria-labelledby="column-heading"
    >
      <h2 className="text-sm text-neutral uppercase" id="column-heading">
        {column.statusName} ({column.tasksByStatusId.length})
      </h2>
      <ul
        ref={ref}
        className={`${isDraggedOver ? 'bg-neutral bg-opacity-25' : ''} flex-1 w-[280px]`}
      >
        {column.tasksByStatusId.map((task, index) => (
          <Modal.Root key={task.id}>
            <Modal.Open opens="task-details">
              <TaskCard
                task={task}
                className="my-5"
                dataTestid={`task-${index + 1}`}
              />
            </Modal.Open>
            <Modal.Window name="task-details">
              <TaskDetails task={task} />
            </Modal.Window>
          </Modal.Root>
        ))}
      </ul>
    </section>
  );
}

export default Columns;
