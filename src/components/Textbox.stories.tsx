import type { Meta, StoryObj } from '@storybook/react';
import { Textbox } from './Textbox';

const meta: Meta<typeof Textbox> = {
  title: 'Components/Textbox',
  component: Textbox,
  args: {
    label: 'Boardname',
    id: 'board-name',
  },

  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Textbox>;

export default meta;
type Story = StoryObj<typeof Textbox>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {};
