import type { Meta, StoryObj } from '@storybook/react';
import { AddBoardModal } from './AddBoardModal';

const meta = {
  title: 'boards/AddBoardModal',
  component: AddBoardModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    onSubmit: { type: 'function', control: false },
  },
} satisfies Meta<typeof AddBoardModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (data) => {
      alert(`Values: ${JSON.stringify(data, null, 2)}`);
    },
  },
};
