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

export const Default: Story = {};
export const NoProject: Story = {};
export const ProjectWithoutColumns: Story = {};
