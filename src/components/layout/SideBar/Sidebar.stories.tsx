import { testBoards } from '@/features/boards';

import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { KanbanMockStore } from '@/app/ReduxMockStore';
import { testTasks } from '@/features/tasks';

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
