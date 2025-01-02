import { KanbanMockStore } from '@/app/ReduxMockStore';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, screen, userEvent, waitFor, within } from '@storybook/test';
import { testTasks } from '../tasks';
import { AddBoardModal } from './AddBoardModal';
import { testBoards } from './data';

const meta = {
  title: 'boards/AddBoardModal',
  component: AddBoardModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (story) => (
      <div style={{ margin: '3rem' }}>
        <KanbanMockStore
          state={{
            boardState: {
              boards: testBoards,
              loading: false,
              error: '',
              activeBoard: testBoards[0],
            },
            taskState: testTasks,
          }}
        >
          {story()}
        </KanbanMockStore>
      </div>
    ),
  ],
  excludeStories: ['openModalAndAddBoardPlay'],
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

  await userEvent.click(
    within(addBoardForm).getByRole('button', { name: '+ Add New Column' }),
  );
  await userEvent.type(
    within(addBoardForm).getByTestId('status.1.statusName'),
    'Doing',
  );
  await userEvent.click(within(addBoardForm).getByText('Create new Board'));
  await waitFor(() => expect(addBoardForm).not.toBeInTheDocument());
};

export const OpenModalAndAddBoard: Story = {
  play: openModalAndAddBoardPlay,
};
