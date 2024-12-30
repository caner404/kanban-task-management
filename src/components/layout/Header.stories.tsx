import { KanbanMockStore } from '@/app/ReduxMockStore';
import { testBoards } from '@/features/boards';
import { testTasks } from '@/features/tasks';
import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta = {
  title: 'components/layouts/Header',
  component: Header,
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
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    board: {
      id: '1',
      name: 'Moonspring Valley',
      status: [
        { id: '1', name: 'Todo', boardId: '1' },
        { id: '2', name: 'Doing', boardId: '1' },
      ],
    },
  },
};
export const ProjectEmpty: Story = {
  args: {
    board: null,
  },
};
export const ProjectWithoutColumns: Story = {
  args: {
    board: {
      id: '1',
      name: 'Moonspring Valley',
      status: [],
    },
  },
};
