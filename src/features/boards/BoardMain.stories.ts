import type { Meta, StoryObj } from '@storybook/react';
import { BoardMain } from './BoardMain';

const meta = {
  title: 'boards/BoardMain',
  component: BoardMain,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BoardMain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BoardIsEmpty: Story = {
  args: {
    board: {
      id: '1',
      name: 'Moonspring Vale',
      columns: [],
    },
  },
};

export const NoBoardFound: Story = {
  args: {
    board: null,
  },
};
