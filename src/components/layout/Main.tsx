import { useAppSelector } from '@/app/hooks';
import { AddBoard, AddBoardColumn, Board } from '@/features/boards';
import { ComponentProps } from 'react';
import { Card } from '../Card';
import { selectTasksByBoardId } from '@/features/tasks';
import Modal from '@/components/Modal';
import { TaskDetails } from '@/features/tasks';

type ButtonProps = ComponentProps<'main'> & { board: Board | null };
export function Main(props: ButtonProps) {
  const { board } = props;

  const tasks = useAppSelector((state) =>
    selectTasksByBoardId(state, board?.id ?? null),
  );

  const tasksByStatus =
    board?.status?.map((value) => {
      const tasksByStatusId = tasks.filter(
        (task) => task.boardStatusId === value.id,
      );
      return {
        statusName: value.name,
        tasksByStatusId,
      };
    }) || [];

  if (!board) return <AddBoard />;
  if (!board.status?.length) return <AddBoardColumn />;

  return (
    <main className="flex flex-1 gap-5 p-6 bg-neutral-light">
      {tasksByStatus.map((column, index) => (
        <div key={index} className="flex flex-col gap-5">
          <h3 className="text-sm text-neutral uppercase">
            {column.statusName} ({column.tasksByStatusId.length})
          </h3>
          {column.tasksByStatusId.map((task) => (
            <Modal.Root>
              <Modal.Open opens="task-details">
                <Card
                  key={task.id}
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
      ))}
    </main>
  );
}
