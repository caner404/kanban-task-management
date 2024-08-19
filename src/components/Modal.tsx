import React, {
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

interface ModalContextType {
  openName: string;
  close: () => void;
  open: Dispatch<SetStateAction<string>>;
}

const ModalContext = createContext<ModalContextType>({
  openName: '',
  close: () => {},
  open: () => {},
});
const useModalContext = () => useContext(ModalContext);

export function Modal({ children }: PropsWithChildren) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  opens: opensWindowName,
}: PropsWithChildren<{ opens: string }>) {
  const { open } = useModalContext();

  return cloneElement(children as ReactElement, {
    onClick: () => open(opensWindowName),
  });
}

function Window({ children, name }: PropsWithChildren<{ name: string }>) {
  const { openName, close } = useModalContext();

  if (name !== openName) return null;
  return createPortal(
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={(e: React.MouseEvent) => {
        const targetElement = e.target as HTMLElement;
        if (targetElement === e.currentTarget) close();
      }}
    >
      <div className="bg-white rounded-md p-8 ">
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(
                child as ReactElement<{ onClose: () => void }>,
                { onClose: close },
              )
            : child,
        )}
      </div>
    </div>,
    document.body,
  );
}

export default {
  Root: Modal,
  Open: Open,
  Window: Window,
};
