import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, screen } from '@storybook/test';
import { AddTaskModal } from './AddTaskModal';

const meta = {
  title: 'tasks/AddTaskModal',
  component: AddTaskModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    onSubmit: { type: 'function', control: false },
  },
} satisfies Meta<typeof AddTaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: () => {},
  },
  play: async ({ canvasElement }) => {
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
  },
};
