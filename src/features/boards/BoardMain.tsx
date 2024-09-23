import { ComponentProps } from 'react';
import { Button } from '@/components/Button';
import { Board } from './types/Board';
import { AddBoardModal } from './AddBoardModal';
import { boardAdded } from './boardsSlice';
import { BoardFormValues } from './AddBoardForm';
import { useAppDispatch } from '../../apps/hooks';

type ButtonProps = ComponentProps<'main'> & { board: Board | null };
export function BoardMain(props: ButtonProps) {
  const dispatch = useAppDispatch();

  if (!props.board)
    return (
      <main
        {...props}
        className={`${props.className} flex flex-col gap-6 justify-center items-center bg-neutral-light p-6`}
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
                columns: data.columns.map((value) => value.columnName),
              }),
            )
          }
        />
      </main>
    );
  return (
    <main
      {...props}
      className={`${props.className} flex flex-col gap-6 justify-center items-center bg-neutral-light p-6`}
    >
      <p className="text-lg text-neutral text-center">
        This board is empty. Create a new column to get started.
      </p>
      <Button>+ Add New Column</Button>
    </main>
  );
}
