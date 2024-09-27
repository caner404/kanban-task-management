import { Header } from '@/components/layout';
import { useAppSelector } from '../../app/hooks';
import { Main } from './Main';

export function AppLayout() {
  const boards = useAppSelector((state) => state.boards.board);

  return (
    <div className="flex flex-col h-[100vh]">
      <Header board={boards[0]} />
      <Main board={boards[0]} />
    </div>
  );
}
