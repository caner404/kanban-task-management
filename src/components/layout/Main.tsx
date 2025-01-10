import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { AddBoard, AddBoardColumn, AddBoardModal } from '@/features/boards';
import { selectTasksByBoardId, Task, taskUpdated } from '@/features/tasks';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { useEffect, useState } from 'react';
import Column from './Column';

export function Main() {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => state.boards.activeBoard);

  const tasks = useAppSelector((state) =>
    selectTasksByBoardId(state, board?.id ?? null),
  );

  const [tasksByStatus, setTasksByStatus] = useState(() => {
    if (!board) return [];
    return board.status.map((value) => {
      const tasksByStatusId = tasks.filter(
        (task) => task.boardStatusId === value.id,
      );
      return {
        statusName: value.name,
        tasksByStatusId,
      };
    });
  });

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

  useEffect(() => {
    if (!board) return;
    setTasksByStatus(
      board.status.map((value) => {
        const tasksByStatusId = tasks.filter(
          (task) => task.boardStatusId === value.id,
        );
        return {
          statusName: value.name,
          tasksByStatusId,
        };
      }),
    );
  }, [board, tasks]);

  if (!board) return <AddBoard />;
  if (!board.status?.length) return <AddBoardColumn />;

  return (
    <main className="flex flex-1 gap-6 p-6 h-max sm:h-[100vh]">
      {tasksByStatus.map((column, index) => (
        <Column
          key={index}
          column={column}
          data-testid={`column-${index + 1}`}
        />
      ))}
      <AddBoardModal board={board}>
        <section className="bg-[#E9EFFA] h-full w-[280px] flex justify-center items-center rounded-md hover:cursor-pointer">
          <button className="text-lg text-neutral hover:text-primary ">
            + New Column
          </button>
        </section>
      </AddBoardModal>
    </main>
  );
}
