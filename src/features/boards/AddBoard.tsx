import { AddBoardModal } from './AddBoardModal';

export function AddBoard() {
  return (
    <main
      className={` flex flex-1 flex-col gap-6 justify-center items-center bg-neutral-light p-6`}
    >
      <p className="text-lg text-neutral text-center">
        Please create a board to get started.
      </p>
      <AddBoardModal />
    </main>
  );
}
