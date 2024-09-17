import { IconCross } from '@/assets/IconCross';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../apps/hooks';
import { boardAdded } from './boardsSlice';

interface Column {
  columnName: string;
}

interface FormValues {
  name: string;
  columns: Column[];
}

export function AddBoardForm() {
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    dispatch(
      boardAdded({
        id: Date.now().toString(36),
        name: data.name,
        columns: data.columns.map((value) => value.columnName),
      }),
    );

  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      name: 'Harry potter',
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
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-lg">Add Board</h2>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label>Name</Label>
          <Input placeholder="e.g Web Design" {...register('name')} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Columns</Label>
          {fields.map((field, index) => (
            <div className="flex gap-2" key={field.id}>
              <Input
                className="flex-1"
                {...register(`columns.${index}.columnName`)}
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
