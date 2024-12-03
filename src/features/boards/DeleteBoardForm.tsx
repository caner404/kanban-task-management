import { Button } from '@/components/Button';
import { Board } from './types';

function DeleteBoardForm({
  board,
  onDelete,
  onClose,
}: {
  board: Board;
  onDelete: () => void;
  onClose?: () => void; //comes from Modal Component
}) {
  function handleDeleteBoard() {
    onDelete();
    onClose?.();
  }
  return (
    <div
      className="flex flex-col p-8 gap-6 rounded-md w-[480px]"
      data-testid="deleteBoard"
    >
      <h2 className="text-danger text-lg">Delete this board?</h2>
      <p className="text-neutral text-md">
        Are you sure you want to delete the ‘{board.name}’ board? This action
        will remove all columns and tasks and cannot be reversed.
      </p>
      <div className="flex gap-4 justify-center items-center">
        <Button
          className="flex-1"
          variant="destructive"
          data-testid="deleteBoardBtn"
          onClick={handleDeleteBoard}
        >
          Delete
        </Button>
        <Button className="flex-1" variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default DeleteBoardForm;
