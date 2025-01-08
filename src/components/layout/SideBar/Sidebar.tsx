import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { IconDarkTheme, IconHideSidebar, IconLightTheme } from '@/assets';
import { AddBoardModal, Board, updateActiveBoard } from '@/features/boards';
import { SidebarListItem } from './SideBarListItem';

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.boards);
  const activeBoard = useAppSelector((state) => state.boards.activeBoard);

  function handleSelectBoard(board: Board) {
    dispatch(updateActiveBoard(board));
    onClose?.();
  }
  return (
    <div
      className={`flex flex-col gap-3 w-[300px] bg-white rounded-lg md:rounded-none md:h-screen py-4`}
    >
      <h2 className="text-sm text-neutral tracking-[2.4px] pl-8">
        ALL BOARDS ({boards.length})
      </h2>
      <ul className="w-[275px]">
        {boards.map((board) => (
          <li key={board.id}>
            <SidebarListItem
              title={board.name}
              variant={activeBoard?.id === board.id ? 'active' : 'default'}
              onClick={() => handleSelectBoard(board)}
            />
          </li>
        ))}
        <AddBoardModal>
          <SidebarListItem title="+ Create new Board" variant="create" />
        </AddBoardModal>
      </ul>
      <div className="flex items-center justify-center gap-6 mt-auto mx-4 p-4 rounded-xl bg-neutral-light">
        <IconLightTheme />
        <div className="w-10 h5 bg-primary rounded-xl p-1">
          <div className="h-4 w-4 bg-white rounded-full"></div>
        </div>
        <IconDarkTheme />
      </div>

      <SidebarListItem
        title="Hide Sidebar"
        onClick={onClose}
        className="hidden sm:flex"
      >
        <IconHideSidebar />
      </SidebarListItem>
    </div>
  );
}
