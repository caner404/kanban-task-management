import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectItem } from './Select';

const meta: Meta<typeof Select> = {
  title: 'components/form/Select',
  component: Select,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em', width: '500px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select className="flex w-full">
      <SelectItem value="Todo">Todo</SelectItem>
      <SelectItem value="Doing">Doing</SelectItem>
      <SelectItem value="Done">Done</SelectItem>
    </Select>
  ),
};
