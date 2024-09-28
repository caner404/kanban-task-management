import Modal from '@components/Modal';
import { Button } from '@components/Button';
import { AddTaskForm } from './AddTaskForm';

export function AddTaskModal() {
  return (
    <div>
      <Modal.Root>
        <Modal.Open opens="task-form">
          <Button name="addTaskBtn"> + Add New Task</Button>
        </Modal.Open>
        <Modal.Window name="task-form">
          <AddTaskForm />
        </Modal.Window>
      </Modal.Root>
    </div>
  );
}
