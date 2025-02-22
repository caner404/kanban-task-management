import { Label, Select, SelectItem, Checkbox } from '@/components/form';
import { Task } from './types';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectBoardById } from '../boards';
import {
  selectSubTasksCompleted,
  subTaskUpdated,
  taskUpdated,
} from './tasksSlice';
import { TaskMenu } from './Taskmenu';

export function TaskDetails({ task }: { task: Task }) {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => selectBoardById(state, task.boardId));
  const subTasksCompleted = useAppSelector((state) =>
    selectSubTasksCompleted(state, task.id),
  );

  if (!board) return;
  return (
    <div className="flex flex-col gap-6 p-6 dark:bg-neutral-dark">
      <div className="flex justify-between items-center">
        <h2 className="text-lg dark:text-white">{task.title}</h2>
        <TaskMenu task={task} currentBoard={board} />
      </div>
      <p className="text-base text-neutral">{task.description}</p>

      <fieldset>
        <legend className="text-neutral dark:text-white text-sm mb-4">
          Subtasks ({subTasksCompleted.length} of {task.subTasks.length})
        </legend>
        <div className="flex flex-col justify-center gap-2">
          {task.subTasks.map((subTask) => {
            return (
              <Checkbox
                key={subTask.id}
                checked={subTask.isCompleted}
                onCheckedChange={(isChecked) =>
                  dispatch(
                    subTaskUpdated({ ...subTask, isCompleted: isChecked }),
                  )
                }
              >
                {subTask.title}
              </Checkbox>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <Label htmlFor="select-column">Current Status</Label>
        <Select
          id='"select-column"'
          defaultValue={
            board?.status.find((status) => status.id === task.boardStatusId)
              ?.name
          }
          onSelectedChange={(selectionValue) =>
            dispatch(() => {
              const boardStatus = board?.status.find(
                (status) => status.name === selectionValue,
              );
              if (boardStatus)
                dispatch(
                  taskUpdated({ ...task, boardStatusId: boardStatus.id }),
                );
            })
          }
        >
          {board?.status.map((boardStatus) => {
            return (
              <SelectItem key={boardStatus.id}>{boardStatus.name}</SelectItem>
            );
          })}
        </Select>
      </div>
    </div>
  );
}
