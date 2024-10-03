import { IconCross } from '@/assets/IconCross';
import { Button } from '@/components/Button';
import { Input, Label, Textbox } from '@/components/form';

import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

interface Column {
  statusName: string;
}

export interface BoardFormValues {
  boardName: string;
  status: Column[];
}

export function AddBoardForm({
  onSubmit,
  onClose,
}: {
  onSubmit: (data: BoardFormValues) => void;
  onClose?: () => void; //comes from Modal Component
}) {
  const onSubmitForm: SubmitHandler<BoardFormValues> = (data) => {
    onSubmit(data);
    onClose?.();
  };

  const { register, handleSubmit, control } = useForm<BoardFormValues>({
    defaultValues: {
      boardName: '',
      status: [{ statusName: '' }, { statusName: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'status',
  });

  return (
    <form
      className="flex flex-col gap-6 w-[480px] p-8"
      onSubmit={handleSubmit(onSubmitForm)}
      data-testid="addBoardForm"
    >
      <h2 className="text-lg">Add Board</h2>
      <div className="flex flex-col gap-6">
        <Textbox
          placeholder="e.g Web Design"
          label="Board Name"
          id="board-name"
          {...register('boardName', { required: true })}
        />
        <div className="flex flex-col gap-2">
          <Label>Columns</Label>
          {fields.map((field, index) => (
            <div className="flex gap-2" key={field.id}>
              <Input
                className="flex-1"
                data-testid={`status.${index}.statusName`}
                id={`status.${index}.statusName`}
                {...register(`status.${index}.statusName`, { required: true })}
              />
              <Button variant="inline" onClick={() => remove(index)}>
                <IconCross />
              </Button>
            </div>
          ))}
        </div>
        <Button variant="secondary" onClick={() => append({ statusName: '' })}>
          + Add New Column
        </Button>
      </div>
      <Button variant="primary" name="addBoardFormBtn">
        Create new Board
      </Button>
    </form>
  );
}
