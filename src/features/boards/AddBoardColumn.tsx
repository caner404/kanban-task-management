import { Button } from '../../components/Button';

export function AddBoardColumn() {
  return (
    <main
      className={`flex flex-1 flex-col gap-6 justify-center items-center bg-neutral-light dark:bg-neutral-darker p-6`}
    >
      <p className="text-lg text-neutral text-center">
        This board is empty. Create a new column to get started.
      </p>
      <Button>+ Add New Column</Button>
    </main>
  );
}
