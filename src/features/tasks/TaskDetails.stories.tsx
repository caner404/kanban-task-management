import type { Meta, StoryObj } from '@storybook/react';
import { TaskDetails } from './TaskDetails';
import { BoardMockStore } from '@/components/layout/AppLayout.stories';
import { Task } from './types';

const meta = {
  title: 'tasks/TaskDetails',
  component: TaskDetails,
  tags: ['autodocs'],
  excludeStories: ['mockTask'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TaskDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const mockTask: Task = {
  id: '1',
  title:
    'Research pricing points of various competitors and trial different business models',
  description:
    "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
  boardId: '1',
  boardStatusId: '1',
  subTasks: [
    {
      id: '1',
      title: 'Research competitor pricing and business models',
      isCompleted: true,
      taskId: '1',
    },
    {
      id: '2',
      title: 'Outline a business model that works for our solution',
      isCompleted: true,
      taskId: '1',
    },
    {
      id: '3',
      title: 'Surveying and testing',
      isCompleted: false,
      taskId: '1',
    },
  ],
};

export const Default: Story = {
  decorators: [
    (story) => (
      <BoardMockStore
        state={{
          boardState: {
            boards: [
              {
                id: '1',
                name: 'Moonlight Sun',
                status: [
                  { boardId: '1', id: '1', name: 'todo' },
                  { boardId: '1', id: '2', name: 'Doing' },
                ],
              },
            ],
            loading: false,
            error: '',
          },
          taskState: [mockTask],
        }}
      >
        {story()}
      </BoardMockStore>
    ),
  ],
  args: {
    task: mockTask,
  },
};
