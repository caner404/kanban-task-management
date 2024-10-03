import { useAppDispatch } from '@/app/hooks';
import { Button } from '@components/Button';
import Modal from '@components/Modal';
import { AddBoardForm, BoardFormValues } from './AddBoardForm';
import { boardAdded } from './boardsSlice';
import { nanoid } from '@reduxjs/toolkit';

export function AddBoardModal() {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Modal.Root>
        <Modal.Open opens="board-form">
          <Button name="addBoardBtn">+ add a board</Button>
        </Modal.Open>
        <Modal.Window name="board-form">
          <AddBoardForm
            onSubmit={(data: BoardFormValues) => {
              const boardId = nanoid();
              dispatch(
                boardAdded({
                  id: boardId,
                  name: data.boardName,
                  status: data.status.map((value) => ({
                    id: nanoid(),
                    name: value.statusName,
                    boardId: boardId,
                  })),
                }),
              );
            }}
          />
        </Modal.Window>
      </Modal.Root>
    </div>
  );
}
