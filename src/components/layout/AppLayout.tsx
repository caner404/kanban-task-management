import { Button } from '../Button';
import { Header } from './header';
import { Main } from './main';

export function AppLayout() {
  return (
    <div className="flex flex-col h-[100vh]">
      <Header />
      <Main className="flex-1">
        <p className="text-lg text-neutral text-center">
          This board is empty. Create a new column to get started.
        </p>
        <Button>+ Add New Column</Button>
      </Main>
    </div>
  );
}
