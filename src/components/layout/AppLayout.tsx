import { useAppSelector } from '../../app/hooks';
import { Main } from './Main';
import { Header } from './Header';

export function AppLayout() {
  const boards = useAppSelector((state) => state.boards.boards);

  return (
    <div className="flex flex-col h-[100vh]">
      <Header board={boards[0]} />
      <Main board={boards[0]} />
    </div>
  );
}
