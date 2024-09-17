import { IconCross } from '@/assets/IconCross';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

interface Column {
  columnName: string;
}

export interface BoardFormValues {
  name: string;
  columns: Column[];
}

export function AddBoardForm({
  onSubmit,
}: {
  onSubmit: (data: BoardFormValues) => void;
}) {
  const onSubmitForm: SubmitHandler<BoardFormValues> = (data) => {
    onSubmit(data);
  };

  const { register, handleSubmit, control } = useForm<BoardFormValues>({
    defaultValues: {
      name: '',
      columns: [{ columnName: 'Todo' }, { columnName: 'Doing' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
  });

  return (
    <form
      className="flex flex-col gap-6 w-[480px] p-8"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <h2 className="text-lg">Add Board</h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label>Name</Label>
          <Input
            placeholder="e.g Web Design"
            {...register('name', { required: true })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Columns</Label>
          {fields.map((field, index) => (
            <div className="flex gap-2" key={field.id}>
              <Input
                className="flex-1"
                {...register(`columns.${index}.columnName`, { required: true })}
              />
              <Button variant="inline" onClick={() => remove(index)}>
                <IconCross />
              </Button>
            </div>
          ))}
        </div>
        <Button variant="secondary" onClick={() => append({ columnName: '' })}>
          + Add New Column
        </Button>
      </div>
      <Button variant="primary">Create new Board</Button>
    </form>
  );
}
