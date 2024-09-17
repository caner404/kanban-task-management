import type { Meta, StoryObj } from '@storybook/react';
import { BoardHeader } from './BoardHeader';

const meta = {
  title: 'boards/BoardHeader',
  component: BoardHeader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BoardHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    board: {
      id: '1',
      name: 'Moonspring Valley',
      columns: ['Todo', 'Progress', 'Done'],
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
      columns: [],
    },
  },
};
