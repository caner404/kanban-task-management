import { Task } from './types/Task';

export function TaskListItem({ task }: { task: Task }) {
  const { title, subTasks } = task;
  const subtaskDoneCount = subTasks.filter(
    (subTask) => subTask.isCompleted,
  ).length;

  return (
    <div className="bg-white rounded-md py-6 px-4 drop-shadow-lg">
      <div className="flex flex-col gap-2">
        <p className="text-md">{title}</p>
        <p className="text-sm text-neutral">
          {subtaskDoneCount} of {subTasks.length} subtasks
        </p>
      </div>
    </div>
  );
}
