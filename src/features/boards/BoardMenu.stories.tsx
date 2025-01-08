import { KanbanMockStore } from '@/app/ReduxMockStore';
import type { Meta, StoryObj } from '@storybook/react';
import { testTasks } from '../tasks';
import { BoardMenu } from './BoardMenu';
import { testBoards } from './data';

const meta: Meta<typeof BoardMenu> = {
  title: 'boards/BoardMenu',
  component: BoardMenu,
  parameters: {
    layout: 'centered',
  },
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
} satisfies Meta<typeof BoardMenu>;

export default meta;
type Story = StoryObj<typeof BoardMenu>;

export const Default: Story = {};

export const EditBoard: Story = {
  args: { board: testBoards[0] },
};
