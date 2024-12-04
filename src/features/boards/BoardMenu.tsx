import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/menu';
import Modal from '@/components/Modal';
import { nanoid } from '@reduxjs/toolkit';
import { selectTasksByBoardId, tasksDeleted } from '../tasks';
import { AddBoardForm, BoardFormValues } from './AddBoardForm';
import { boarddDeleted, boardUpdated } from './boardsSlice';
import DeleteBoardForm from './DeleteBoardForm';
import { Board } from './types';

export function BoardMenu({ board }: { board: Board }) {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) =>
    selectTasksByBoardId(state, board?.id ?? null),
  );

  function handleDelete() {
    dispatch(boarddDeleted(board));
    dispatch(tasksDeleted(tasks));
  }

  return (
    <Menu data-testid="board-menu">
      <MenuTrigger data-testid="board-menu-trigger" />
      <MenuContent>
        <MenuItem>
          <Modal.Root>
            <Modal.Open opens="edit-board">
              <MenuItem>
                <p className="text-neutral">Edit board</p>
              </MenuItem>
            </Modal.Open>
            <Modal.Window name="edit-board">
              <AddBoardForm
                editBoard={board}
                onSubmit={(data: BoardFormValues) => {
                  dispatch(
                    boardUpdated({
                      id: board.id,
                      name: data.boardName,
                      status: data.status.map((value, index) => {
                        return {
                          id: board.status[index]
                            ? board.status[index].id
                            : nanoid(),
                          boardId: board.id,
                          name: value.statusName,
                        };
                      }),
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
                  <p className="text-danger">Delete board</p>
                </MenuItem>
              </Modal.Open>
              <Modal.Window name="delete-board">
                <DeleteBoardForm
                  board={board}
                  onDelete={() => handleDelete()}
                />
              </Modal.Window>
            </Modal.Root>
          </MenuItem>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
