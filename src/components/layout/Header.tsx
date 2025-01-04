import { useAppSelector } from '@/app/hooks';
import { BoardMenu } from '@/features/boards';
import { AddTaskModal } from '@/features/tasks';

import logoDark from '@assets/logo-dark.svg';
import logolightMobile from '@assets/logo-mobile.svg';
import { Sidebar } from './SideBar';
import Modal from '../Modal';
import { IconChevronDown } from '@/assets';

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
          <div className="flex gap-2 items-center sm:h-full mr-auto">
            <h1 className="text-lg" data-testid="board-header-name">
              {board.name}
            </h1>

            <Modal.Root>
              <Modal.Open opens="sidebar-modal">
                <div className="flex-1 hover:cursor-pointer sm:hidden">
                  <IconChevronDown />
                </div>
              </Modal.Open>
              <Modal.Window name="sidebar-modal">
                <Sidebar />
              </Modal.Window>
            </Modal.Root>
          </div>
          <div className="flex items-center">
            <AddTaskModal board={board} />
            <BoardMenu board={board} />
          </div>
        </>
      )}
    </div>
  );
}
