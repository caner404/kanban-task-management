import { useAppSelector } from '../../app/hooks';
import { Main } from './Main';
import { Header } from './Header';
import { Sidebar } from './SideBar';

export function AppLayout() {
  const boards = useAppSelector((state) => state.boards.boards);
  const activeBoard = useAppSelector((state) => state.boards.activeBoard);

  console.log(`My Boards${boards}`);

  return (
    <div className="flex flex-col h-[100vh]">
      <Header board={activeBoard} />
      <div className="flex">
        <Sidebar boards={boards} activeBoard={activeBoard} />
        <Main board={activeBoard} />
      </div>
    </div>
  );
}
