import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { buttonVariants, sizes } from './button-variants';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,

  args: {
    children: 'Button',
    variant: 'primary',
    disabled: false,
    size: 'medium',
  },
  argTypes: {
    children: {
      name: 'Label',
      control: 'text',
    },
    size: {
      control: 'select',
      options: Object.keys(sizes),
    },
    variant: {
      control: 'select',
      options: Object.keys(buttonVariants),
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Primary UI Component for User Interaction',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};
