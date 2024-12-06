import { IconCross } from '@/assets/IconCross';
import { Button } from '@/components/Button';
import { Input, Label, Textbox } from '@/components/form';

import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Board } from './types';
import { useAppSelector } from '@/app/hooks';
import { selectColumnsCount } from '../tasks';

interface Column {
  statusName: string;
  count: number;
}

export interface BoardFormValues {
  boardName: string;
  status: Column[];
}

export function AddBoardForm({
  onSubmit,
  onClose,
  editBoard,
}: {
  onSubmit: (data: BoardFormValues) => void;
  onClose?: () => void; //comes from Modal Component
  editBoard?: Board;
}) {
  const onSubmitForm: SubmitHandler<BoardFormValues> = (data) => {
    onSubmit(data);
    onClose?.();
  };

  const columnCounts = useAppSelector((state) =>
    selectColumnsCount(state, editBoard?.status),
  );
  const { register, handleSubmit, control } = useForm<BoardFormValues>({
    defaultValues: {
      boardName: editBoard?.name ?? '',
      status: editBoard?.status.map((value) => {
        return {
          statusName: value.name,
          count: columnCounts[value.name] ? columnCounts[value.name].count : 0,
        };
      }) ?? [{ statusName: '', count: 0 }],
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
      <h2 className="text-lg"> {editBoard ? 'Edit' : 'Add'} Board</h2>
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
              <Button
                variant="inline"
                onClick={() => remove(index)}
                disabled={field.count > 1}
              >
                <IconCross />
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="secondary"
          onClick={() => append({ statusName: '', count: 0 })}
        >
          + Add New Column
        </Button>
      </div>
      <Button
        variant="primary"
        name="addBoardFormBtn"
        data-testid="saveBoardButton"
        type="submit"
      >
        {editBoard ? 'Save Changes' : 'Create new Board'}
      </Button>
    </form>
  );
}
