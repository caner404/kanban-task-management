import { BoardHeader } from './BoardHeader';
import { BoardMain } from './BoardMain';
import { Board } from './types/Board';

export function BoardOverview() {
  const board: Board = {
    id: '1',
    name: 'Moonspring Vale',
    columns: [],
  };
  return (
    <div className="flex flex-col h-[100vh]">
      <BoardHeader board={board} />
      <BoardMain board={board} className="flex-1"></BoardMain>
    </div>
  );
}
