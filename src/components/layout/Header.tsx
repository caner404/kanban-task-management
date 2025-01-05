import { useAppSelector } from '@/app/hooks';
import { BoardMenu } from '@/features/boards';
import { AddTaskModal } from '@/features/tasks';

import { IconChevronDown } from '@/assets';
import logoDark from '@assets/logo-dark.svg';
import logolightMobile from '@assets/logo-mobile.svg';
import Modal from '../Modal';
import { Sidebar } from './SideBar';

export function Header() {
  const board = useAppSelector((state) => state.boards.activeBoard);

  return (
    <div
      className={`p-4 sm:px-4 sm:border-b sm:border-b-lines-light sm:h-[81px] flex gap-[34px] items-center sm:justify-normal`}
    >
      <img
        src={logolightMobile}
        alt="logo kanban mobile"
        className="block sm:hidden"
      />
      <img
        src={logoDark}
        alt="logo kanban tablet"
        className="hidden sm:block"
      />
      <div className="hidden sm:block w-[1px] h-full bg-lines-light"></div>

      {board && (
        <>
          <Modal.Root>
            <Modal.Open opens="sidebar-modal">
              <div className="flex items-center gap-2 sm:h-full mr-auto hover:cursor-pointer">
                <h1
                  className="text-lg min-w-max"
                  data-testid="board-header-name"
                >
                  {board.name}
                </h1>
                <div className="sm:hidden">
                  <IconChevronDown />
                </div>
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
    </div>
  );
}
