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

export function MenuTrigger({ ...props }: ComponentProps<'button'>) {
  const { setIsVisible } = useMenuContext();
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsVisible((isVisisble) => !isVisisble);
  }

  return (
    <button
      {...props}
      onClick={handleClick}
      aria-label="Button to open Menu"
      className="hover:cursor-pointer p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <IconMenu />
    </button>
  );
}

export function MenuContent({ children }: PropsWithChildren) {
  const { isVisible } = useMenuContext();
  return (
    <ul
      className={`${isVisible ? 'flex' : 'hidden'} absolute p-4 rounded-lg bg-white dark:bg-neutral-darker flex-col gap-4 right-0 w-[200px] top-16 drop-shadow-md z-50`}
    >
      {children}
    </ul>
  );
}

export function MenuItem({ children }: PropsWithChildren) {
  return <li>{children}</li>;
}

export default {
  Root: Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
};
