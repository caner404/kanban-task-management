import { IconMenu } from '@/assets/IconMenu';
import {
  ComponentProps,
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
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

export function Menu({
  children,
  ...props
}: PropsWithChildren & ComponentProps<'div'>) {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <MenuContext.Provider value={{ isVisible, setIsVisible }}>
      <div
        {...props}
        ref={menuRef}
        className="relative flex flex-col justify-center items-center gap-2"
      >
        {children}
      </div>
    </MenuContext.Provider>
  );
}

export function MenuTrigger({ ...props }: ComponentProps<'div'>) {
  const { setIsVisible } = useMenuContext();
  function handleClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setIsVisible((isVisisble) => !isVisisble);
  }

  return (
    <div {...props} onClick={handleClick} className="hover:cursor-pointer p-4">
      <IconMenu />
    </div>
  );
}

export function MenuContent({ children }: PropsWithChildren) {
  const { isVisible } = useMenuContext();
  return (
    <ul
      className={`${isVisible ? 'flex' : 'hidden'} absolute p-4 rounded-lg bg-white flex-col gap-4 right-0 w-[200px] top-16 drop-shadow-md`}
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
