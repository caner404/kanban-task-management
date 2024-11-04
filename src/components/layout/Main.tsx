import { useAppSelector } from '@/app/hooks';
import { AddBoard, AddBoardColumn, Board } from '@/features/boards';
import { selectTasksByBoardId } from '@/features/tasks';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { ComponentProps, useEffect } from 'react';
import Column from './Column';

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

  useEffect(() => {
    monitorForElements({
      onDrop({ source, location }) {
        console.log(source.data);
        console.log(location.current.dropTargets);
      },
    });
  });

  if (!board) return <AddBoard />;
  if (!board.status?.length) return <AddBoardColumn />;

  return (
    <main className="flex flex-1 gap-5 p-6 bg-neutral-light">
      {tasksByStatus.map((column, index) => (
        <Column key={index} column={column} />
      ))}
    </main>
  );
}
