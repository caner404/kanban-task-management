import { KanbanMockStore } from '@/app/ReduxMockStore';
import { testBoards } from '@/features/boards';
import { openModalAndAddTaskPlay, testTasks } from '@/features/tasks';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, screen, userEvent, waitFor, within } from '@storybook/test';
import { AppLayout } from './AppLayout';

const meta = {
  title: 'components/layouts/AppLayout',
  component: AppLayout,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    (story) => (
      <KanbanMockStore
        state={{
          boardState: {
            boards: testBoards,
            loading: false,
            error: '',
            activeBoard: testBoards[0],
          },
          taskState: testTasks,
        }}
      >
        {story()}
      </KanbanMockStore>
    ),
  ],
  excludeStories: ['BoardMockStore'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CreateBoard: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(screen.getByTestId('showSidebar'));
    const createBoardBtn = canvas.getByRole('button', {
      name: /create/i,
    });

    await userEvent.click(createBoardBtn);

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
      'todo',
    );

    await userEvent.click(
      within(addBoardForm).getByRole('button', { name: '+ Add New Column' }),
    );
    await userEvent.type(
      within(addBoardForm).getByTestId('status.1.statusName'),
      'Done',
    );

    await userEvent.click(
      await within(addBoardForm).findByRole('button', {
        name: /create new board/i,
      }),
    );
    await waitFor(() => expect(addBoardForm).not.toBeInTheDocument());

    expect(screen.getByTestId('board-header-name')).toHaveTextContent(
      'Moonlight Sun',
    );
  },
};

export const EditBoard: Story = {
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
      'todo',
    );

    await userEvent.click(
      within(addBoardForm).getByRole('button', { name: '+ Add New Column' }),
    );

    await userEvent.clear(
      within(addBoardForm).getByTestId('status.3.statusName'),
    );
    await userEvent.type(
      within(addBoardForm).getByTestId('status.3.statusName'),
      'Testing',
    );

    await userEvent.click(
      await within(addBoardForm).findByRole('button', { name: /Save Changes/ }),
    );
    await waitFor(() => expect(addBoardForm).not.toBeInTheDocument());
  },
};

export const DeleteBoard: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const boardmenuTrigger = canvas.getByTestId('board-menu-trigger');
    await userEvent.click(boardmenuTrigger);
    await userEvent.click(canvas.getByText(/Delete/i));

    const deleteBoard = screen.getByTestId('deleteDialog');
    const deleteButton = screen.getByRole('button', { name: /delete/i });

    await userEvent.click(deleteButton);

    await waitFor(() => expect(deleteBoard).not.toBeInTheDocument());
  },
};

export const AddTask: Story = {
  play: async ({ context }) => {
    openModalAndAddTaskPlay(context);
  },
};

export const EditTask: Story = {
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

export const DeleteTask: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const taskCard = canvas.getByRole('button', {
      name: /coffee break/i,
    });

    await userEvent.click(taskCard);

    const taskmenuTrigger = screen.getByTestId('task-menu-trigger');
    await userEvent.click(taskmenuTrigger);
    await userEvent.click(screen.getByText(/Delete Task/i));
    const deleteDialog = screen.getByTestId('deleteDialog');
    await expect(deleteDialog).toBeInTheDocument();

    await userEvent.click(
      within(deleteDialog).getByRole('button', { name: /delete/i }),
    );

    await waitFor(() => expect(deleteDialog).not.toBeInTheDocument());
  },
};

export const NoColumns: Story = {
  decorators: [
    (story) => (
      <div style={{ margin: '3rem' }}>
        <KanbanMockStore
          state={{
            boardState: {
              boards: [
                {
                  id: 'board-1',
                  name: 'Play GTA 6',
                  status: [],
                },
              ],
              activeBoard: {
                id: 'board-1',
                name: 'Play GTA 6',
                status: [],
              },
              loading: false,
              error: '',
            },
            taskState: [],
          }}
        >
          {story()}
        </KanbanMockStore>
      </div>
    ),
  ],
};

export const NoProject: Story = {
  decorators: [
    (story) => (
      <div style={{ margin: '3rem' }}>
        <KanbanMockStore
          state={{
            boardState: {
              boards: [],
              loading: false,
              error: '',
              activeBoard: null!,
            },
            taskState: [],
          }}
        >
          {story()}
        </KanbanMockStore>
      </div>
    ),
  ],
};
