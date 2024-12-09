import {
  DeleteDialog,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from '@/components/menu';
import Modal from '@/components/Modal';
import { AddTaskForm } from './AddTaskForm';
import { Task } from './types';
import { Board } from '../boards';
import { useAppDispatch } from '@/app/hooks';
import { tasksDeleted } from './tasksSlice';

export function TaskMenu({
  task,
  currentBoard,
}: {
  task: Task;
  currentBoard: Board;
}) {
  const dispatch = useAppDispatch();

  function handleTaskDelete() {
    dispatch(tasksDeleted([task]));
  }

  return (
    <Menu data-testid="task-menu">
      <MenuTrigger data-testid="task-menu-trigger" />
      <MenuContent>
        <MenuItem>
          <Modal.Root>
            <Modal.Open opens="edit-task">
              <MenuItem>
                <p className="text-neutral">Edit Task</p>
              </MenuItem>
            </Modal.Open>
            <Modal.Window name="edit-task">
              <AddTaskForm editTask={task} board={currentBoard} />
            </Modal.Window>
          </Modal.Root>
        </MenuItem>
        <MenuItem>
          <MenuItem>
            <Modal.Root>
              <Modal.Open opens="delete-task">
                <MenuItem>
                  <p className="text-danger">Delete Task</p>
                </MenuItem>
              </Modal.Open>
              <Modal.Window name="delete-task">
                <DeleteDialog
                  type="task"
                  description={`Are you sure you want to delete the ‘${task.title}’ task and its subtasks? This action cannot be reversed.`}
                  onDelete={() => handleTaskDelete()}
                />
              </Modal.Window>
            </Modal.Root>
          </MenuItem>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
