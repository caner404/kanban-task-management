import type { Meta, StoryObj } from '@storybook/react';
import { TaskList } from './TaskList';

const meta: Meta<typeof TaskList> = {
  title: 'Tasks/TaskList',
  component: TaskList,

  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof TaskList>;

export const Default: Story = {
  args: {
    tasks: [
      {
        id: '1',
        title: 'Build UI for onboarding flow',
        subTasks: [],
        boardId: '1',
      },
      {
        id: '2',
        title: 'Build UI for search',
        subTasks: [],
        boardId: '1',
      },
      {
        id: '3',
        title: 'Build settings UI',
        subTasks: [],
        boardId: '1',
      },
      {
        id: '4',
        title: 'QA and test all major user journeys',
        subTasks: [],
        boardId: '1',
      },
    ],
  },
};
