import { Label, Select, SelectItem, Checkbox } from '@/components/form';
import { Task } from './types';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectBoardById } from '../boards';
import { selectSubTasksCompleted, subTaskUpdated } from './tasksSlice';

export function TaskDetails({ task }: { task: Task }) {
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => selectBoardById(state, task.boardId));
  const subTasksCompleted = useAppSelector((state) =>
    selectSubTasksCompleted(state, task.id),
  );

  return (
    <div className="flex flex-col gap-6 w-[480px] p-6">
      <h2 className="text-lg">{task.title}</h2>
      <p className="text-base text-neutral">{task.description}</p>
      <Label>
        Subtasks ({subTasksCompleted.length} of {task.subTasks.length})
      </Label>
      <div className="flex flex-col justify-center gap-2">
        {task.subTasks.map((subTask) => {
          return (
            <Checkbox
              key={subTask.id}
              checked={subTask.isCompleted}
              onCheckedChange={(isChecked) =>
                dispatch(subTaskUpdated({ ...subTask, isCompleted: isChecked }))
              }
            >
              {subTask.title}
            </Checkbox>
          );
        })}
      </div>
      <div className="flex flex-col gap-2">
        <Label>Current Status</Label>
        <Select>
          {board?.status.map((value) => {
            return <SelectItem key={value.id}>{value.name}</SelectItem>;
          })}
        </Select>
      </div>
    </div>
  );
}
