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
    await userEvent.click(canvas.getByText('+ add a board'));

    const addBoardForm = screen.getByTestId('addBoardForm');
    await expect(addBoardForm).toBeInTheDocument();

    await userEvent.type(
      within(addBoardForm).getByLabelText('Board Name'),
      'Moonlight Sun',
    );

    await userEvent.type(
      within(addBoardForm).getByTestId('columns.0.columnName'),
      'Todo',
    );

    await userEvent.type(
      within(addBoardForm).getByTestId('columns.1.columnName'),
      'Doing',
    );
    await userEvent.click(within(addBoardForm).getByText('Create new Board'));
    await expect(addBoardForm).not.toBeInTheDocument();
  },
};
