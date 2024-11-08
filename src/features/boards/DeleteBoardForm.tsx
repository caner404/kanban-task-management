import { Button } from '@/components/Button';

function DeleteBoardForm() {
  return (
    <div className="flex flex-col p-8 gap-6 rounded-md w-[480px]">
      <h2 className="text-danger text-lg">Delete this board?</h2>
      <p className="text-neutral text-md">
        Are you sure you want to delete the ‘Platform Launch’ board? This action
        will remove all columns and tasks and cannot be reversed.
      </p>
      <div className="flex gap-4 justify-center items-center">
        <Button className="flex-1" variant="destructive">
          Delete
        </Button>
        <Button className="flex-1" variant="secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default DeleteBoardForm;
