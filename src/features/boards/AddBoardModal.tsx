import Modal from '@components/Modal';
import { Button } from '@components/Button';
import { AddBoardForm, BoardFormValues } from './AddBoardForm';

export function AddBoardModal({
  onSubmit,
}: {
  onSubmit: (data: BoardFormValues) => void;
}) {
  return (
    <div>
      <Modal.Root>
        <Modal.Open opens="board-form">
          <Button name="addBoardBtn">+ add a board</Button>
        </Modal.Open>
        <Modal.Window name="board-form">
          <AddBoardForm onSubmit={onSubmit} />
        </Modal.Window>
      </Modal.Root>
    </div>
  );
}
