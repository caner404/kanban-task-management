import { LogoLightMobile } from '@assets/LogoLightMobile';
import { IconChevronDown } from '@assets/IconChevronDown';
import { Button } from '@components/Button';
import { IconAddTaskMobile } from '@assets/IconAddTaskMobile';
import { IconMenu } from '@/assets/IconMenu';

export function Header() {
  return (
    <div className="p-4 flex gap-[34px] items-center justify-center">
      <LogoLightMobile />
      <div className="flex gap-2 justify-center items-center ">
        <h1 className="text-lg">Platform Launch</h1>
        <IconChevronDown />
      </div>
      <Button disabled size="small">
        <IconAddTaskMobile />
      </Button>
      <IconMenu />
    </div>
  );
}
