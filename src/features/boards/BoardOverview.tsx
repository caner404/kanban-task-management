import { BoardHeader } from './BoardHeader';
import { BoardMain } from './BoardMain';
import { Board } from './types/Board';

export function BoardOverview() {
  const boards: Board[] = [];
  return (
    <div className="flex flex-col h-[100vh]">
      <BoardHeader board={boards[0]} />
      <BoardMain board={boards[0]} className="flex-1"></BoardMain>
    </div>
  );
}
