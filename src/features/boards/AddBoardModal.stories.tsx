import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within, screen } from '@storybook/test';
import { AddBoardModal } from './AddBoardModal';
import {
  BoardMockStore,
  mockBoard,
} from '@/components/layout/AppLayout.stories';

const meta = {
  title: 'boards/AddBoardModal',
  component: AddBoardModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  excludeStories: ['openModalAndAddBoardPlay'],
  argTypes: {
    onSubmit: { type: 'function', control: false },
  },
} satisfies Meta<typeof AddBoardModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const openModalAndAddBoardPlay = async ({
  canvasElement,
}: {
  canvasElement: HTMLElement;
}) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByText('+ add a board'));

  const addBoardForm = screen.getByTestId('addBoardForm');
  await expect(addBoardForm).toBeInTheDocument();

  await userEvent.type(
    within(addBoardForm).getByLabelText('Board Name'),
    'Moonlight Sun',
  );

  await userEvent.type(
    within(addBoardForm).getByTestId('status.0.statusName'),
    'Todo',
  );

  await userEvent.type(
    within(addBoardForm).getByTestId('status.1.statusName'),
    'Doing',
  );
  await userEvent.click(within(addBoardForm).getByText('Create new Board'));
  await expect(addBoardForm).not.toBeInTheDocument();
};

export const OpenModalAndAddBoard: Story = {
  args: {
    onSubmit: () => {},
  },
  decorators: [
    (story) => (
      <BoardMockStore
        state={{
          boardState: { boards: mockBoard, loading: false, error: '' },
          taskState: [],
        }}
      >
        {story()}
      </BoardMockStore>
    ),
  ],
  play: openModalAndAddBoardPlay,
};
