import { IconMenu } from '@/assets/IconMenu';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface MenuContextType {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const MenuContext = createContext<MenuContextType>({
  isVisible: false,
  setIsVisible: () => {},
});
const useMenuContext = () => useContext(MenuContext);

export function Menu({ children }: PropsWithChildren) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <MenuContext.Provider value={{ isVisible, setIsVisible }}>
      <div className="relative flex flex-col justify-center items-center gap-2">
        {children}
      </div>
    </MenuContext.Provider>
  );
}

export function MenuTrigger() {
  const { setIsVisible } = useMenuContext();
  function handleClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setIsVisible((isVisisble) => !isVisisble);
  }

  return (
    <div onClick={handleClick} className="hover:cursor-pointer p-4">
      <IconMenu />
    </div>
  );
}

export function MenuContent({ children }: PropsWithChildren) {
  const { isVisible } = useMenuContext();
  return (
    <ul
      className={`${isVisible ? 'block' : 'hidden'} p-4 rounded-lg bg-white flex flex-col gap-4`}
    >
      {children}
    </ul>
  );
}

export function MenuItem({
  children,
  onClick,
}: PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <div onClick={onClick} className="hover:cursor-pointer">
      {children}
    </div>
  );
}

export default {
  Root: Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
};
