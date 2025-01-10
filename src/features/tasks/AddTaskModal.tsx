import { Button } from '@components/Button';
import Modal from '@components/Modal';
import { AddTaskForm } from './AddTaskForm';
import { Board } from '@/features/boards';
import { IconAddTaskMobile } from '@/assets';
import { useEffect, useState } from 'react';

export function AddTaskModal({ board }: { board: Board }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <Modal.Root>
        <Modal.Open opens="task-form">
          {isMobile ? (
            <Button
              disabled={board.status.length === 0}
              aria-disabled={board.status.length === 0}
              size="small"
              aria-label="add new task"
            >
              <IconAddTaskMobile />
            </Button>
          ) : (
            <Button
              name="addTaskBtn"
              disabled={board.status.length === 0}
              aria-disabled={board.status.length === 0}
            >
              + Add New Task
            </Button>
          )}
        </Modal.Open>
        <Modal.Window name="task-form">
          <AddTaskForm board={board} />
        </Modal.Window>
      </Modal.Root>
    </div>
  );
}
