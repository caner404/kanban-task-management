import { IconMenu } from '@/assets/IconMenu';
import { IconAddTaskMobile } from '@assets/IconAddTaskMobile';
import { IconChevronDown } from '@assets/IconChevronDown';
import logolightMobile from '@assets/logo-mobile.svg';
import logoDark from '@assets/logo-dark.svg';
import { Button } from '@components/Button';

export function BoardHeader() {
  return (
    <div className="p-4 sm:p-0 sm:px-4 sm:border-b sm:border-b-lines-light sm:h-[81px] flex gap-[34px] items-center justify-center sm:justify-normal">
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
      <div className="flex gap-2 justify-center items-center sm:mr-auto sm:h-full">
        <h1 className="text-lg">Platform Launch</h1>
        <IconChevronDown />
      </div>
      <Button disabled size="small" className="block sm:hidden">
        <IconAddTaskMobile />
      </Button>
      <Button disabled className="hidden sm:block">
        + Add New Task
      </Button>
      <IconMenu />
    </div>
  );
}
