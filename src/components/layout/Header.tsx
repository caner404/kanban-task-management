import { useAppSelector } from '@/app/hooks';
import { BoardMenu } from '@/features/boards';
import { AddTaskModal } from '@/features/tasks';

import { IconChevronDown } from '@/assets';
import logoDark from '@assets/logo-dark.svg';
import logolight from '@assets/logo-light.svg';
import logolightMobile from '@assets/logo-mobile.svg';
import Modal from '../Modal';
import { Sidebar } from './SideBar';
import { useDarkMode } from '@/context';

export function Header() {
  const board = useAppSelector((state) => state.boards.activeBoard);
  const { isDarkMode } = useDarkMode();

  return (
    <header
      className={`p-4 sm:p-0 sm:px-4 md:h-[96px] sm:border-b sm:border-b-lines-light dark:sm:border-b-lines-dark sm:h-[81px] flex gap-[34px] items-center sm:justify-normal dark:bg-neutral-dark`}
    >
      {isDarkMode ? (
        <img
          src={logolight}
          alt="logo of kanban board with the text 'kanban'"
          className="hidden sm:block"
        />
      ) : (
        <img
          src={logoDark}
          alt="logo of kanban board with the text 'kanban'"
          className="hidden sm:inline-block"
        />
      )}

      <img
        src={logolightMobile}
        alt="logo of kanban board"
        className="block sm:hidden"
      />

      <div className="hidden sm:block sm:w-[1px] sm:h-full bg-lines-light dark:bg-lines-dark"></div>

      {board && (
        <>
          <Modal.Root>
            <Modal.Open opens="sidebar-modal">
              <div className="flex items-center gap-2 sm:h-full mr-auto hover:cursor-pointer">
                <h1
                  className="text-lg min-w-max dark:text-white"
                  data-testid="board-header-name"
                >
                  {board.name}
                </h1>
                <button className="sm:hidden">
                  <IconChevronDown />
                </button>
              </div>
            </Modal.Open>
            <Modal.Window name="sidebar-modal">
              <Sidebar />
            </Modal.Window>
          </Modal.Root>

          <div className="flex items-center">
            <AddTaskModal board={board} />
            <BoardMenu board={board} />
          </div>
        </>
      )}
    </header>
  );
}
