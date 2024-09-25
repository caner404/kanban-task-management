import { useAppSelector } from '../../apps/hooks';
import { BoardHeader } from './BoardHeader';
import { BoardMain } from './BoardMain';

export function BoardOverview() {
  const boards = useAppSelector((state) => state.boards.board);

  return (
    <div className="flex flex-col h-[100vh]">
      <BoardHeader board={boards[0]} />
      <BoardMain board={boards[0]} />
    </div>
  );
}
