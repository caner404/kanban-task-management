import { IconCross } from '@/assets/IconCross';
import { Button } from '@/components/Button';

import { Label } from '@/components/form/Label';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import {
  Input,
  Textarea,
  Textbox,
  Select,
  SelectItem,
} from '@/components/form';

export interface TaskFormValues {
  title: string;
  description: string;
  subTasks: { subTask: string }[];
  column: string;
}

export function AddTaskForm({
  onClose,
}: {
  onClose?: () => void; //comes from Modal Component
}) {
  const onSubmitForm: SubmitHandler<TaskFormValues> = (data) => {
    console.log(data);
    onClose?.();
  };

  const { register, handleSubmit, control } = useForm<TaskFormValues>({
    defaultValues: {
      subTasks: [
        {
          subTask: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subTasks',
  });

  return (
    <form
      className="flex flex-col gap-6 w-[480px] p-8"
      onSubmit={handleSubmit(onSubmitForm)}
      data-testid="addTaskForm"
    >
      <h2 className="text-lg">Add New Task</h2>
      <div className="flex flex-col gap-6">
        <Textbox
          placeholder="e.g Take coffee break"
          label="Title"
          id="task-title"
          {...register('title', { required: true })}
        />
        <Textarea
          label="Description"
          id="task-description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          {...register('description', { required: true })}
        />

        <div className="flex flex-col gap-2">
          <Label>SubTasks</Label>
          {fields.map((field, index) => (
            <div className="flex gap-2" key={field.id}>
              <Input
                className="flex-1"
                placeholder=""
                data-testid={`subTasks.${index}.subTask`}
                id={`subTasks.${index}.subTask`}
                {...register(`subTasks.${index}.subTask`, {
                  required: true,
                })}
              />
              <Button variant="inline" onClick={() => remove(index)}>
                <IconCross />
              </Button>
            </div>
          ))}
        </div>
        <Button variant="secondary" onClick={() => append({ subTask: '' })}>
          + Add New SubTask
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Current Status</Label>
        <Select {...register('column', { required: true })}>
          <SelectItem value="Todo">Todo</SelectItem>
          <SelectItem value="Doing">Doing</SelectItem>
          <SelectItem value="Done">Done</SelectItem>
        </Select>
      </div>

      <Button variant="primary" name="addTaskFormBtn">
        Create new Task
      </Button>
    </form>
  );
}
