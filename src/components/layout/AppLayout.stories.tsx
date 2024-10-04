import { Board, boardsSlice } from '@/features/boards';
import { openModalAndAddTaskPlay, Task, tasksSlice } from '@/features/tasks';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { AppLayout } from './AppLayout';
import { within } from '@storybook/test';

export const BoardMockStore = ({
  state,
  children,
}: {
  state: { boardState: Board[]; taskState: Task[] };
  children: ReactNode;
}) => (
  <Provider
    store={configureStore({
      reducer: {
        boards: createSlice({
          name: 'boards',
          initialState: state.boardState,
          reducers: boardsSlice.caseReducers,
        }).reducer,
        tasks: createSlice({
          name: 'tasks',
          initialState: state.taskState,
          reducers: tasksSlice.caseReducers,
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export const mockBoard: Board[] = [
  {
    id: '1',
    name: 'Moonlight Beach',
    status: [
      { id: '1', name: 'Todo', boardId: '1' },
      { id: '2', name: 'Doing', boardId: '1' },
    ],
  },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Coffee break',
    description: 'Something Something description',
    subTasks: [],
    boardId: '1',
    boardStatusId: '1',
  },
];

const meta = {
  title: 'components/layouts/AppLayout',
  component: AppLayout,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [(story) => <div style={{ margin: '3rem' }}>{story()}</div>],
  excludeStories: ['mockBoard', 'BoardMockStore', 'mockTasks'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (story) => (
      <BoardMockStore state={{ boardState: mockBoard, taskState: mockTasks }}>
        {story()}
      </BoardMockStore>
    ),
  ],
  play: async ({ context, canvasElement }) => {
    const canvas = within(canvasElement);
    console.log(canvas);
    openModalAndAddTaskPlay(context);
  },
};

export const NoColumns: Story = {
  decorators: [
    (story) => (
      <BoardMockStore
        state={{
          boardState: [{ id: '1', name: 'Moonlight Sun', status: [] }],
          taskState: [],
        }}
      >
        {story()}
      </BoardMockStore>
    ),
  ],
};

export const NoProject: Story = {
  decorators: [
    (story) => (
      <BoardMockStore
        state={{
          boardState: [],
          taskState: [],
        }}
      >
        {story()}
      </BoardMockStore>
    ),
  ],
};
