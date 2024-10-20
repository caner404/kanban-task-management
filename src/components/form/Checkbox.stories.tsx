import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/form/Checkbox',
  component: Checkbox,
  args: {
    children: 'Some Checkbox',
    onCheckedChange: (isChecked) => {
      console.log('Checked Value', isChecked);
    },
  },
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    checked: false,
  },
};
export const Checked: Story = {
  args: {
    checked: true,
  },
};
