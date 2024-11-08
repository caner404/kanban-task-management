import type { Meta, StoryObj } from '@storybook/react';
import { BoardMenu } from './BoardMenu';
import {
  BoardMockStore,
  mockBoard,
} from '@/components/layout/AppLayout.stories';

const meta: Meta<typeof BoardMenu> = {
  title: 'boards/BoardMenu',
  component: BoardMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BoardMenu>;

export default meta;
type Story = StoryObj<typeof BoardMenu>;

export const Default: Story = {
  decorators: [
    (story) => (
      <BoardMockStore state={{ boardState: mockBoard, taskState: [] }}>
        {story()}
      </BoardMockStore>
    ),
  ],
};
