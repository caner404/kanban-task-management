import type { Meta, StoryObj } from '@storybook/react';
import { TaskListItem } from './TaskListItem';

const meta: Meta<typeof TaskListItem> = {
  title: 'Tasks/TaskListItem',
  component: TaskListItem,

  parameters: {
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof TaskListItem>;

export default meta;
type Story = StoryObj<typeof TaskListItem>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    task: {
      id: '1',
      boardId: '1',
      title: 'Build UI for onboarding flow',
      subTasks: [
        {
          id: '1',
          title: 'Build Header',
          isCompleted: false,
          taskId: '1',
        },
        {
          id: '2',
          title: 'Import svg files for User Icons',
          isCompleted: true,
          taskId: '1',
        },
        {
          id: '3',
          title: 'Implement API Calls from backend',
          isCompleted: false,
          taskId: '1',
        },
      ],
    },
  },
};
