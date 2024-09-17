import type { Meta, StoryObj } from '@storybook/react';
import { AddBoardForm } from './AddBoardForm';

const meta = {
  title: 'boards/AddBoardForm',
  component: AddBoardForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    onSubmit: { type: 'function', control: false },
  },
} satisfies Meta<typeof AddBoardForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (data) => {
      alert(`Values: ${JSON.stringify(data, null, 2)}`);
    },
  },
};
