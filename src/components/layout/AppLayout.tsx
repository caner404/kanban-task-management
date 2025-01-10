import { useState } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Sidebar } from './SideBar';
import { IconShowSidebar } from '@/assets';

export function AppLayout() {
  const [hideSidebar, setHideSidebar] = useState(true);
  return (
    <div className="flex flex-col h-[100vh]">
      <Header />
      <div className="flex bg-neutral-light  overflow-x-auto h-full">
        {hideSidebar ? (
          <button
            data-testid="showSidebar"
            aria-label="Open Sidebar for Kanban Boards"
            className="w-14 h-12 bg-primary rounded-tr-full rounded-br-full justify-center items-center hover:cursor-pointer absolute bottom-5 hidden sm:flex focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setHideSidebar(false)}
          >
            <IconShowSidebar />
          </button>
        ) : (
          <Sidebar onClose={() => setHideSidebar(true)} />
        )}
        <Main />
      </div>
    </div>
  );
}
