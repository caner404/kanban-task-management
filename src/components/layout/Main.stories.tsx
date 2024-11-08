import type { Meta, StoryObj } from '@storybook/react';
import { BoardMockStore } from './AppLayout.stories';
import { Main } from './Main';

const meta = {
  title: 'components/layouts/Main',
  component: Main,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (story) => (
      <div style={{ margin: '3rem' }}>
        <BoardMockStore
          state={{
            boardState: { boards: [], loading: false, error: '' },
            taskState: [],
          }}
        >
          {story()}
        </BoardMockStore>
      </div>
    ),
  ],
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
