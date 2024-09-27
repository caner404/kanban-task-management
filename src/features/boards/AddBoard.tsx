import { useAppDispatch } from '../../app/hooks';
import { BoardFormValues } from './AddBoardForm';
import { AddBoardModal } from './AddBoardModal';
import { boardAdded } from './boardsSlice';

export function AddBoard() {
  const dispatch = useAppDispatch();
  return (
    <main
      className={` flex flex-1 flex-col gap-6 justify-center items-center bg-neutral-light p-6`}
    >
      <p className="text-lg text-neutral text-center">
        Please create a board to get started.
      </p>
      <AddBoardModal
        onSubmit={(data: BoardFormValues) =>
          dispatch(
            boardAdded({
              id: Date.now().toString(36),
              name: data.boardName,
              columns: data.columns.map((value) => ({
                title: value.columnName,
                tasks: [],
              })),
            }),
          )
        }
      />
    </main>
  );
}
