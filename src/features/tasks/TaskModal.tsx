import Modal from '@/components/Modal';
import { Task } from './types';
import { TaskCard } from './TaskCard';
import { TaskDetails } from './TaskDetails';

export function TaskModal({ task }: { task: Task }) {
  return (
    <Modal.Root key={task.id}>
      <Modal.Open opens="task-details">
        <TaskCard task={task} className="m-5" />
      </Modal.Open>
      <Modal.Window name="task-details">
        <TaskDetails task={task} />
      </Modal.Window>
    </Modal.Root>
  );
}
