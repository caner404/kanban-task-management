import { IconCross } from '@/assets/IconCross';
import { Button } from '@/components/Button';
import { Input, Label, Textbox } from '@/components/form';

import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { Board } from './types';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectColumnsCount } from '../tasks';
import { boardAdded, boardUpdated } from './boardsSlice';
import { nanoid } from '@reduxjs/toolkit';

interface Column {
  statusName: string;
  count: number;
}

export interface BoardFormValues {
  boardName: string;
  status: Column[];
}

export function AddBoardForm({
  onClose,
  editBoard,
}: {
  onClose?: () => void; //comes from Modal Component
  editBoard?: Board;
}) {
  const dispatch = useAppDispatch();
  const onSubmitForm: SubmitHandler<BoardFormValues> = (data) => {
    if (editBoard) {
      dispatch(
        boardUpdated({
          id: editBoard.id,
          name: data.boardName,
          status: data.status.map((value, index) => {
            return {
              id: editBoard.status[index]
                ? editBoard.status[index].id
                : nanoid(),
              boardId: editBoard.id,
              name: value.statusName,
            };
          }),
        }),
      );
    } else {
      const boardId = nanoid();
      dispatch(
        boardAdded({
          id: boardId,
          name: data.boardName,
          status: data.status.map((value) => ({
            id: nanoid(),
            name: value.statusName,
            boardId: boardId,
          })),
        }),
      );
    }
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
      className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-8 h-[450px] sm:h-[490px] md:h-fit overflow-y-auto"
      onSubmit={handleSubmit(onSubmitForm)}
      data-testid="addBoardForm"
    >
      <h2 className="text-lg dark:text-white">
        {editBoard ? 'Edit' : 'Add New '} Board
      </h2>
      <section className="flex flex-col gap-6">
        <Textbox
          placeholder="e.g Web Design"
          label="Board Name"
          id="board-name"
          {...register('boardName', { required: true })}
        />
        <section
          className="flex flex-col gap-2"
          aria-labelledby="columns-heading"
        >
          <Label id="columns-heading">Columns</Label>
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

          <Button
            variant="secondary"
            className="mt-4"
            onClick={() => append({ statusName: '', count: 0 })}
          >
            + Add New Column
          </Button>
        </section>
      </section>
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
