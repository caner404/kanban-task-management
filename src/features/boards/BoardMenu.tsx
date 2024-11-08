import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/menu';
import Modal from '@/components/Modal';
import { AddBoardForm, BoardFormValues } from './AddBoardForm';
import { nanoid } from '@reduxjs/toolkit';
import { boardAdded } from './boardsSlice';
import { useAppDispatch } from '@/app/hooks';
import DeleteBoardForm from './DeleteBoardForm';

export function BoardMenu() {
  const dispatch = useAppDispatch();
  return (
    <Menu>
      <MenuTrigger />
      <MenuContent>
        <MenuItem>
          <Modal.Root>
            <Modal.Open opens="edit-board">
              <MenuItem>
                <p className="text-neutral">edit board</p>
              </MenuItem>
            </Modal.Open>
            <Modal.Window name="edit-board">
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
        </MenuItem>
        <MenuItem>
          <MenuItem>
            <Modal.Root>
              <Modal.Open opens="delete-board">
                <MenuItem>
                  <p className="text-danger">delete board</p>
                </MenuItem>
              </Modal.Open>
              <Modal.Window name="delete-board">
                <DeleteBoardForm />
              </Modal.Window>
            </Modal.Root>
          </MenuItem>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
