import type { Meta, StoryObj } from '@storybook/react';
import { BoardMain } from './BoardMain';
import { BoardMockStore } from './BoardOverview.stories';

const defaultBoard = [
  {
    id: '1',
    name: 'Moonlight Sun',
    columns: [],
  },
];

const meta = {
  title: 'boards/BoardMain',
  component: BoardMain,
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
          boardState={{
            board: defaultBoard,
          }}
        >
          {story()}
        </BoardMockStore>
      </div>
    ),
  ],
} satisfies Meta<typeof BoardMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BoardIsEmpty: Story = {
  args: {
    board: defaultBoard[0],
  },
};

export const NoBoardFound: Story = {
  args: {
    board: null,
  },
};
