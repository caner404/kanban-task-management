import Modal from '@components/Modal';
import { Button } from '@components/Button';
import { AddBoardForm } from './AddBoardForm';

export function AddBoard() {
  return (
    <div>
      <Modal.Root>
        <Modal.Open opens="board-form">
          <Button>+ add a board</Button>
        </Modal.Open>
        <Modal.Window name="board-form">
          <AddBoardForm />
        </Modal.Window>
      </Modal.Root>
    </div>
  );
}
