import { Button } from '@components/Button';
import Modal from '@components/Modal';
import { AddTaskForm } from './AddTaskForm';
import { Board } from '@/features/boards';

export function AddTaskModal({ board }: { board: Board }) {
  return (
    <div>
      <Modal.Root>
        <Modal.Open opens="task-form">
          <Button name="addTaskBtn"> + Add New Task</Button>
        </Modal.Open>
        <Modal.Window name="task-form">
          <AddTaskForm board={board} />
        </Modal.Window>
      </Modal.Root>
    </div>
  );
}
