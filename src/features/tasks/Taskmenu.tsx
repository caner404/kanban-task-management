import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/menu';
import Modal from '@/components/Modal';
import { AddTaskForm } from './AddTaskForm';
import { Task } from './types';
import { Board } from '../boards';

export function TaskMenu({
  task,
  currentBoard,
}: {
  task: Task;
  currentBoard: Board;
}) {
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
              <Modal.Window name="delete-task"></Modal.Window>
            </Modal.Root>
          </MenuItem>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
