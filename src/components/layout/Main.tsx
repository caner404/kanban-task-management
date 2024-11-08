import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { AddBoard, AddBoardColumn, Board } from '@/features/boards';
import { selectTasksByBoardId, Task, taskUpdated } from '@/features/tasks';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { ComponentProps, useEffect } from 'react';
import Column from './Column';

type ButtonProps = ComponentProps<'main'> & { board: Board | null };
export function Main(props: ButtonProps) {
  const { board } = props;
  const dispatch = useAppDispatch();

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
        const draggedTask = source.data as Task;
        const columnData = location.current.dropTargets[0].data;

        const dropTargetColumn = board?.status.find(
          (column) => column.name === columnData.statusName,
        );
        if (!dropTargetColumn) return;

        dispatch(
          taskUpdated({
            ...draggedTask,
            boardStatusId: dropTargetColumn.id,
          }),
        );
      },
    });
  }, [board, dispatch]);

  if (!board) return <AddBoard />;
  if (!board.status?.length) return <AddBoardColumn />;

  return (
    <main className="flex flex-1 gap-6 p-6 bg-neutral-light overflow-x-auto">
      {tasksByStatus.map((column, index) => (
        <Column key={index} column={column} />
      ))}
    </main>
  );
}
