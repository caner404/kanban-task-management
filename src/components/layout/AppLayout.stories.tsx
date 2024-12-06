import { Board, boardsSlice } from '@/features/boards';
import { openModalAndAddTaskPlay, Task, tasksSlice } from '@/features/tasks';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, screen, userEvent, waitFor, within } from '@storybook/test';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { AppLayout } from './AppLayout';

export const BoardMockStore = ({
  state,
  children,
}: {
  state: {
    boardState: { boards: Board[]; loading: boolean; error?: string };
    taskState: Task[];
  };
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
      <BoardMockStore
        state={{
          boardState: { boards: mockBoard, loading: false, error: '' },
          taskState: mockTasks,
        }}
      >
        {story()}
      </BoardMockStore>
    ),
  ],
};

export const EditBoard: Story = {
  decorators: [
    (story) => (
      <BoardMockStore
        state={{
          boardState: { boards: mockBoard, loading: false, error: '' },
          taskState: mockTasks,
        }}
      >
        {story()}
      </BoardMockStore>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boardmenuTrigger = canvas.getByTestId('board-menu-trigger');
    await userEvent.click(boardmenuTrigger);
    await userEvent.click(canvas.getByText(/Edit/));

    const addBoardForm = screen.getByTestId('addBoardForm');
    await expect(addBoardForm).toBeInTheDocument();

    await userEvent.clear(within(addBoardForm).getByLabelText('Board Name'));
    await userEvent.type(
      within(addBoardForm).getByLabelText('Board Name'),
      'Moonlight Sun',
    );
    await userEvent.clear(
      within(addBoardForm).getByTestId('status.0.statusName'),
    );
    await userEvent.type(
      within(addBoardForm).getByTestId('status.0.statusName'),
      'todo test',
    );

    await userEvent.click(
      within(addBoardForm).getByRole('button', { name: '+ Add New Column' }),
    );
    await userEvent.type(
      within(addBoardForm).getByTestId('status.2.statusName'),
      'Done',
    );

    await userEvent.click(
      await within(addBoardForm).findByRole('button', { name: /Save Changes/ }),
    );
    await waitFor(() => expect(addBoardForm).not.toBeInTheDocument());
  },
};

export const DeleteBoard: Story = {
  decorators: [
    (story) => (
      <BoardMockStore
        state={{
          boardState: { boards: mockBoard, loading: false, error: '' },
          taskState: mockTasks,
        }}
      >
        {story()}
      </BoardMockStore>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boardmenuTrigger = canvas.getByTestId('board-menu-trigger');
    await userEvent.click(boardmenuTrigger);
    await userEvent.click(canvas.getByText(/Delete/i));

    const deleteBoard = screen.getByTestId('deleteBoard');
    const deleteButton = screen.getByRole('button', { name: /delete/i });

    await userEvent.click(deleteButton);

    await waitFor(() => expect(deleteBoard).not.toBeInTheDocument());

    await waitFor(() =>
      expect(screen.queryByTestId('board-header-name')).not.toBeInTheDocument(),
    );

    await waitFor(() =>
      expect(
        screen.queryByRole('button', { name: /add new task/i }),
      ).not.toBeInTheDocument(),
    );

    await waitFor(() =>
      expect(screen.queryByTestId('board-menu')).not.toBeInTheDocument(),
    );
  },
};

export const AddTask: Story = {
  decorators: [
    (story) => (
      <BoardMockStore
        state={{
          boardState: { boards: mockBoard, loading: false, error: '' },
          taskState: mockTasks,
        }}
      >
        {story()}
      </BoardMockStore>
    ),
  ],
  play: async ({ context }) => {
    openModalAndAddTaskPlay(context);
  },
};

export const EditTask: Story = {
  decorators: [
    (story) => (
      <BoardMockStore
        state={{
          boardState: { boards: mockBoard, loading: false, error: '' },
          taskState: mockTasks,
        }}
      >
        {story()}
      </BoardMockStore>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const taskCard = canvas.getByRole('button', {
      name: /coffee break/i,
    });

    await userEvent.click(taskCard);

    const taskmenuTrigger = screen.getByTestId('task-menu-trigger');
    await userEvent.click(taskmenuTrigger);
    await userEvent.click(screen.getByText(/Edit Task/i));
    const taskForm = screen.getByTestId('addTaskForm');
    await expect(taskForm).toBeInTheDocument();

    await userEvent.clear(within(taskForm).getByLabelText('Title'));
    await userEvent.type(
      within(taskForm).getByLabelText('Title'),
      'Coffe break with friend and family',
    );
    await userEvent.clear(within(taskForm).getByLabelText('Description'));
    await userEvent.type(
      within(taskForm).getByLabelText('Description'),
      'I want to chill with family and friends and drink coffee and tea ',
    );

    await userEvent.click(within(taskForm).getByText(/Save Changes/i));
    await expect(taskForm).not.toBeInTheDocument();
  },
};

export const NoColumns: Story = {
  decorators: [
    (story) => (
      <BoardMockStore
        state={{
          boardState: {
            boards: [{ id: '1', name: 'Moonlight Sun', status: [] }],
            loading: false,
            error: '',
          },
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
          boardState: {
            boards: [],
            loading: false,
            error: '',
          },
          taskState: [],
        }}
      >
        {story()}
      </BoardMockStore>
    ),
  ],
};
