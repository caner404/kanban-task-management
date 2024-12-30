import { IconDarkTheme, IconHideSidebar, IconLightTheme } from '@/assets';
import { SidebarListItem } from './SideBarListItem';
import { Board, updateActiveBoard } from '@/features/boards';
import { useAppDispatch } from '@/app/hooks';

export function Sidebar({
  boards,
  activeBoard,
}: {
  boards: Board[];
  activeBoard: Board;
}) {
  const dispatch = useAppDispatch();

  function handleSelectBoard(board: Board) {
    console.log(`Select new board ${board.name}`);
    dispatch(updateActiveBoard(board));
  }
  return (
    <div className="flex flex-col gap-3 w-[300px] h-screen">
      <h2 className="text-sm text-neutral tracking-[2.4px] pl-8 py-4">
        ALL BOARDS ({boards.length})
      </h2>
      <ul className="w-[275px]">
        {boards.map((board) => (
          <li key={board.id}>
            <SidebarListItem
              title={board.name}
              variant={activeBoard.id === board.id ? 'active' : 'default'}
              onClick={() => handleSelectBoard(board)}
            />
          </li>
        ))}
        <SidebarListItem title="+ Create new Board" variant="create" />
      </ul>
      <div className="flex items-center justify-center gap-6 mt-auto mx-4 p-4 rounded-xl bg-neutral-light">
        <IconLightTheme />
        <div className="w-10 h5 bg-primary rounded-xl p-1">
          <div className="h-4 w-4 bg-white rounded-full"></div>
        </div>

        <IconDarkTheme />
      </div>

      <SidebarListItem title="Hide Sidebar">
        <IconHideSidebar />
      </SidebarListItem>
    </div>
  );
}
