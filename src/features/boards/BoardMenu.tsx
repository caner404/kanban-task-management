import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  DeleteDialog,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from '@/components/menu';
import Modal from '@/components/Modal';
import { nanoid } from '@reduxjs/toolkit';
import { selectTasksByBoardId, tasksDeleted } from '../tasks';
import { AddBoardForm, BoardFormValues } from './AddBoardForm';
import { boarddDeleted, boardUpdated } from './boardsSlice';
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

  if (!board) return;

  return (
    <Menu data-testid="board-menu">
      <MenuTrigger data-testid="board-menu-trigger" />
      <MenuContent>
        <MenuItem>
          <Modal.Root>
            <Modal.Open opens="edit-board">
              <button className="text-neutral hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-left">
                Edit board
              </button>
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
          <Modal.Root>
            <Modal.Open opens="delete-board">
              <button className="text-danger hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-left">
                Delete board
              </button>
            </Modal.Open>
            <Modal.Window name="delete-board">
              <DeleteDialog
                type="board"
                description={`Are you sure you want to delete the '${board.name}' board? This action will remove all columns and tasks and cannot be reversed.`}
                onDelete={() => handleDelete()}
              />
            </Modal.Window>
          </Modal.Root>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
