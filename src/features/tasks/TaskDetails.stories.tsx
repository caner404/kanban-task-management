import { KanbanMockStore } from '@/app/ReduxMockStore';
import type { Meta, StoryObj } from '@storybook/react';
import { testBoards } from '../boards';
import { testTasks } from './data';
import { TaskDetails } from './TaskDetails';

const meta = {
  title: 'tasks/TaskDetails',
  component: TaskDetails,
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
    layout: 'centered',
  },
} satisfies Meta<typeof TaskDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    task: testTasks[0],
  },
};
