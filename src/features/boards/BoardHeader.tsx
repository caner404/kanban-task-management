import { IconMenu } from '@/assets/IconMenu';
import { IconAddTaskMobile } from '@assets/IconAddTaskMobile';
import logoDark from '@assets/logo-dark.svg';
import logolightMobile from '@assets/logo-mobile.svg';
import iconChevronDown from '@assets/icon-chevron-down.svg';
import { Button } from '@components/Button';
import { Board } from './types/Board';

export function BoardHeader({ board }: { board: Board | null }) {
  return (
    <div
      className={`p-4 sm:p-0 sm:px-4 sm:border-b sm:border-b-lines-light sm:h-[81px] flex gap-[34px] items-center sm:justify-normal`}
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
          <div className="flex gap-2 justify-center items-center sm:mr-auto sm:h-full">
            <h1 className="text-lg">{board.name}</h1>
            <img
              src={iconChevronDown}
              alt="logo kanban tablet"
              className="block sm:hidden"
            />
          </div>
          <Button
            disabled={!(board.columns.length > 0)}
            size="small"
            className="block sm:hidden"
          >
            <IconAddTaskMobile />
          </Button>
          <Button
            disabled={!(board.columns.length > 0)}
            className="hidden sm:block"
          >
            + Add New Task
          </Button>

          <IconMenu />
        </>
      )}
    </div>
  );
}
