import { TaskListItem } from './TaskListItem';
import { Task } from './types/Task';

export function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="flex flex-col gap-5">
      {tasks.map((task: Task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </div>
  );
}
