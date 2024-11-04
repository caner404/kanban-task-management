import { Task, TaskDetails } from '@/features/tasks';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useEffect, useRef, useState } from 'react';
import { Card } from '../Card';
import Modal from '../Modal';

function Columns({
  column,
}: {
  column: { statusName: string; tasksByStatusId: Task[] };
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
    <div
      ref={ref}
      className={`${isDraggedOver ? 'bg-primary' : 'bg-danger'} flex flex-col gap-5 border-2`}
    >
      <h3 className="text-sm text-neutral uppercase">
        {column.statusName} ({column.tasksByStatusId.length})
      </h3>
      {column.tasksByStatusId.map((task) => (
        <Modal.Root key={task.id}>
          <Modal.Open opens="task-details">
            <Card
              title={task.title}
              description={`${task.subTasks.filter((subTask) => subTask.isCompleted).length} of ${task.subTasks.length} subtasks`}
            />
          </Modal.Open>
          <Modal.Window name="task-details">
            <TaskDetails task={task} />
          </Modal.Window>
        </Modal.Root>
      ))}
    </div>
  );
}

export default Columns;
