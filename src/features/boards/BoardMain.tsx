import { ComponentProps } from 'react';
import { Button } from '@/components/Button';
import { Board } from './types/Board';
import { AddBoard } from './AddBoard';

type ButtonProps = ComponentProps<'main'> & { board: Board | null };
export function BoardMain(props: ButtonProps) {
  if (!props.board)
    return (
      <main
        {...props}
        className={`${props.className} flex flex-col gap-6 justify-center items-center bg-neutral-light p-6`}
      >
        <p className="text-lg text-neutral text-center">
          Please create a board to get started.
        </p>
        <AddBoard />
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
