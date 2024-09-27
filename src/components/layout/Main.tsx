import { Board, AddBoard, AddBoardColumn } from '@/features/boards';
import { ComponentProps } from 'react';
import { Card } from '../Card';

type ButtonProps = ComponentProps<'main'> & { board: Board | null };
export function Main(props: ButtonProps) {
  const { board } = props;
  if (!board) return <AddBoard />;
  if (!board.columns?.length) return <AddBoardColumn />;

  return (
    <main className="flex flex-1 gap-5 p-6 bg-neutral-light">
      {board.columns.map((column) => (
        <div className="flex flex-col gap-5">
          <h3 className="text-sm text-neutral uppercase">
            {column.title} ({column.tasks.length})
          </h3>
          {column.tasks.map((task) => (
            <Card
              title={task.title}
              description={`${task.subTasks.filter((value) => value.isCompleted).length} of out ${task.subTasks.length} subtasks`}
            />
          ))}
        </div>
      ))}
    </main>
  );
}
