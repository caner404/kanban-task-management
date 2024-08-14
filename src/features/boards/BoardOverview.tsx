import { Button } from '@components/Button';
import { BoardHeader } from './BoardHeader';
import { BoardMain } from './BoardMain';

export function BoardOverview() {
  return (
    <div className="flex flex-col h-[100vh]">
      <BoardHeader />
      <BoardMain className="flex-1">
        <p className="text-lg text-neutral text-center">
          This board is empty. Create a new column to get started.
        </p>
        <Button>+ Add New Column</Button>
      </BoardMain>
    </div>
  );
}
