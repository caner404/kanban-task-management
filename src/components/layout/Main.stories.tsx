import { KanbanMockStore } from '@/app/ReduxMockStore';
import { testBoards } from '@/features/boards';
import { testTasks } from '@/features/tasks';
import type { Meta, StoryObj } from '@storybook/react';
import { Main } from './Main';

const meta = {
  title: 'components/layouts/Main',
  component: Main,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
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
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BoardIsEmpty: Story = {
  args: {
    board: {
      id: '1',
      name: 'Moonlight Sun',
      status: [],
    },
  },
};

export const NoBoardFound: Story = {
  args: {
    board: null,
  },
};
