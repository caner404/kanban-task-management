import type { Meta, StoryObj } from '@storybook/react';
import { BoardMockStore, mockTasks } from './AppLayout.stories';
import { Header } from './Header';

const meta = {
  title: 'components/layouts/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
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
  decorators: [
    (story) => (
      <BoardMockStore
        state={{
          boardState: {
            boards: [
              {
                id: '1',
                name: 'Moonspring Valley',
                status: [
                  { id: '1', name: 'Todo', boardId: '1' },
                  { id: '2', name: 'Doing', boardId: '1' },
                ],
              },
            ],
            loading: false,
            error: '',
          },
          taskState: mockTasks,
        }}
      >
        {story()}
      </BoardMockStore>
    ),
  ],
};
export const ProjectEmpty: Story = {
  args: {
    board: null,
  },
  decorators: [
    (story) => (
      <BoardMockStore
        state={{
          boardState: {
            boards: null!,
            loading: false,
            error: '',
          },
          taskState: mockTasks,
        }}
      >
        {story()}
      </BoardMockStore>
    ),
  ],
};
export const ProjectWithoutColumns: Story = {
  args: {
    board: {
      id: '1',
      name: 'Moonspring Valley',
      status: [],
    },
  },
  decorators: [
    (story) => (
      <BoardMockStore
        state={{
          boardState: {
            boards: [
              {
                id: '1',
                name: 'Moonspring Valley',
                status: [],
              },
            ],
            loading: false,
            error: '',
          },
          taskState: mockTasks,
        }}
      >
        {story()}
      </BoardMockStore>
    ),
  ],
};
