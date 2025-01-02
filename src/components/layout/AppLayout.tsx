import { Header } from './Header';
import { Main } from './Main';
import { Sidebar } from './SideBar';

export function AppLayout() {
  return (
    <div className="flex flex-col h-[100vh]">
      <Header />
      <div className="flex">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}
