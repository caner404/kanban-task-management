import { Button } from '@components/Button';

export function DeleteDialog({
  type,
  description,
  onDelete,
  onClose,
}: {
  type: string;
  description: string;
  onDelete: () => void;
  onClose?: () => void; //comes from Modal Component
}) {
  function handleDelete() {
    onDelete();
    onClose?.();
  }

  {
    return (
      <div
        className="flex flex-col p-8 gap-6 rounded-md"
        data-testid="deleteDialog"
      >
        <h2 className="text-danger text-lg">Delete this {type} ?</h2>
        <p className="text-neutral text-md">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-center sm:items-center">
          <Button
            className="flex-1"
            variant="destructive"
            data-testid="deleteDialogBtn"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button className="flex-1" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}
