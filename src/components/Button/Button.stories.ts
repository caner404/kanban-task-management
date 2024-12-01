import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { buttonVariants, sizes } from './button-variants';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    variant: 'primary',
    disabled: false,
    size: 'medium',
    onClick: action('onClick'),
    children: 'Button',
  },
  argTypes: {
    children: {
      name: 'Label',
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
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};
