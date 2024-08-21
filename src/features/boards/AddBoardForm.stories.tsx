import type { Meta, StoryObj } from '@storybook/react';
import { AddBoardForm } from './AddBoardForm';

const meta = {
  title: 'boards/AddBoardForm',
  component: AddBoardForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof AddBoardForm>;

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
