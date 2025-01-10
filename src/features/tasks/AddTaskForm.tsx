import { IconCross } from '@/assets/IconCross';
import { Button } from '@/components/Button';
import { Label } from '@/components/form/Label';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { useAppDispatch } from '@/app/hooks';
import {
  Input,
  Select,
  SelectItem,
  Textarea,
  Textbox,
} from '@/components/form';
import { nanoid } from '@reduxjs/toolkit';
import { Board } from '@/features/boards';
import { taskAdded, taskUpdated } from './tasksSlice';
import { Task } from './types';

export interface TaskFormValues {
  title: string;
  description: string;
  subTasks: { subTask: string }[];
  column: string;
}

export function AddTaskForm({
  board,
  editTask,
  onClose,
}: {
  board: Board;
  editTask?: Task;
  onClose?: () => void; //comes from Modal Component
}) {
  const dispatch = useAppDispatch();
  const onSubmitForm: SubmitHandler<TaskFormValues> = (data) => {
    const boardStatus = board.status.filter(
      (value) => value.name === data.column,
    )[0];

    if (editTask) {
      dispatch(
        taskUpdated({
          ...editTask,
          title: data.title,
          description: data.description,
          boardStatusId: boardStatus.id,
          subTasks: data.subTasks.map((subTaskTitle) => {
            const foundSubTask = editTask.subTasks.find((subTask) => {
              subTask.title === subTaskTitle.subTask;
            });
            return foundSubTask
              ? foundSubTask
              : {
                  id: nanoid(),
                  title: subTaskTitle.subTask,
                  isCompleted: false,
                  taskId: editTask.id,
                };
          }),
        }),
      );
    } else {
      const taskId = nanoid();
      dispatch(
        taskAdded({
          id: taskId,
          title: data.title,
          description: data.description,

          subTasks: data.subTasks.map((subTask) => {
            return {
              id: nanoid(),
              title: subTask.subTask,
              isCompleted: false,
              taskId: taskId,
            };
          }),
          boardId: board.id,
          boardStatusId: boardStatus.id,
        }),
      );
    }
    onClose?.();
  };
  const defaultSubTasks = editTask
    ? editTask.subTasks.map((subTask) => ({ subTask: subTask.title }))
    : [{ subTask: '' }];

  const { register, handleSubmit, control } = useForm<TaskFormValues>({
    defaultValues: {
      title: editTask ? editTask.title : '',
      description: editTask?.description ?? '',
      subTasks: defaultSubTasks,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subTasks',
  });

  return (
    <form
      className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-8 h-[470px] sm:h-[675px] md:h-fit overflow-y-auto "
      data-testid="addTaskForm"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <h2 className="text-lg">{editTask ? 'Edit Task' : 'Add New Task'}</h2>
      <section className="flex flex-col gap-6">
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

        <section
          className="flex flex-col gap-2"
          aria-labelledby="subtasks-heading"
        >
          <Label id="subtasks-heading">SubTasks</Label>
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

          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => {
              append({ subTask: '' });
            }}
          >
            + Add New SubTask
          </Button>
        </section>

        <section
          className="flex flex-col gap-2"
          aria-labelledby="column-heading"
        >
          <Label id="column-heading">Current Status</Label>
          <Select {...register('column', { required: true })}>
            {board.status.map((value) => (
              <SelectItem key={value.id} value={`${value.name}`}>
                {value.name}
              </SelectItem>
            ))}
          </Select>
        </section>

        <Button
          variant="primary"
          name="addTaskFormBtn"
          data-testid="submitTaskFormBtn"
          type="submit"
        >
          {editTask ? 'Save Changes' : 'Create new Task'}
        </Button>
      </section>
    </form>
  );
}
