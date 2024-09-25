import { ComponentProps } from 'react';
import { AddBoard } from './AddBoard';
import { AddBoardColumn } from './AddBoardColumn';
import { Board } from './types/Board';

type ButtonProps = ComponentProps<'main'> & { board: Board | null };
export function BoardMain(props: ButtonProps) {
  if (!props.board) return <AddBoard />;
  if (!props.board.columns?.length) return <AddBoardColumn />;
  return <div>Add TaskList Stuff</div>;
}
