import { testBoards } from '@/features/boards';

import { KanbanMockStore } from '@/app/ReduxMockStore';
import { testTasks } from '@/features/tasks';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, screen, userEvent, waitFor, within } from '@storybook/test';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'components/layouts/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
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
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeBoard: testBoards[0],
    boards: testBoards,
  },
};

export const CreateBoard: Story = {
  args: {
    activeBoard: testBoards[0],
    boards: testBoards,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const createBoardBtn = canvas.getByRole('button', {
      name: /create/i,
    });

    await userEvent.click(createBoardBtn);

    const addBoardForm = screen.getByTestId('addBoardForm');
    await expect(addBoardForm).toBeInTheDocument();

    await userEvent.clear(within(addBoardForm).getByLabelText('Board Name'));
    await userEvent.type(
      within(addBoardForm).getByLabelText('Board Name'),
      'Moonlight Sun',
    );
    await userEvent.clear(
      within(addBoardForm).getByTestId('status.0.statusName'),
    );
    await userEvent.type(
      within(addBoardForm).getByTestId('status.0.statusName'),
      'todo',
    );

    await userEvent.click(
      within(addBoardForm).getByRole('button', { name: '+ Add New Column' }),
    );
    await userEvent.type(
      within(addBoardForm).getByTestId('status.1.statusName'),
      'Done',
    );

    await userEvent.click(
      await within(addBoardForm).findByRole('button', {
        name: /create new board/i,
      }),
    );
    await waitFor(() => expect(addBoardForm).not.toBeInTheDocument());
  },
};
