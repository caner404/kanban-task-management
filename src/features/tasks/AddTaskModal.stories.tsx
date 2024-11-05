import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, screen } from '@storybook/test';
import { AddTaskModal } from './AddTaskModal';
import { BoardMockStore } from '@/components/layout/AppLayout.stories';

const meta = {
  title: 'tasks/AddTaskModal',
  component: AddTaskModal,
  tags: ['autodocs'],
  excludeStories: ['openModalAndAddTaskPlay'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AddTaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const openModalAndAddTaskPlay = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByText('+ Add New Task'));

  const addTaskForm = screen.getByTestId('addTaskForm');
  await expect(addTaskForm).toBeInTheDocument();

  await userEvent.type(
    within(addTaskForm).getByLabelText('Title'),
    'take coffee break',
  );

  await userEvent.type(
    within(addTaskForm).getByLabelText('Description'),
    'it"s always good to take a break. This 15 minute break will recharge the batteries a little',
  );

  await userEvent.type(
    within(addTaskForm).getByTestId('subTasks.0.subTask'),
    'prepare coffee',
  );

  await userEvent.click(within(addTaskForm).getByText('+ Add New SubTask'));

  await userEvent.type(
    within(addTaskForm).getByTestId('subTasks.1.subTask'),
    'let the coffee brew for 3 minutes',
  );

  await userEvent.click(within(addTaskForm).getByText('Create new Task'));
  await expect(addTaskForm).not.toBeInTheDocument();
};

export const OpenModalAddTask: Story = {
  args: {
    board: {
      id: '1',
      name: 'Moonlight Beach',
      status: [
        { id: '1', name: 'Todo', boardId: '1' },
        { id: '2', name: 'Doing', boardId: '1' },
      ],
    },
  },
  decorators: [
    (story) => (
      <BoardMockStore
        state={{
          boardState: {
            boards: [
              {
                id: '1',
                name: 'Moonlight Beach',
                status: [
                  { id: '1', name: 'Todo', boardId: '1' },
                  { id: '2', name: 'Doing', boardId: '1' },
                ],
              },
            ],
            loading: false,
            error: '',
          },
          taskState: [],
        }}
      >
        {story()}
      </BoardMockStore>
    ),
  ],
  play: openModalAndAddTaskPlay,
};
