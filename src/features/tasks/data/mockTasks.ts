import { SubTask, Task } from '../types';

export const testSubTasks: SubTask[] = [
  {
    id: 'subtask-1',
    title: 'Write requirements',
    isCompleted: false,
    taskId: 'task-1',
  },
  {
    id: 'subtask-2',
    title: 'Create wireframes',
    isCompleted: true,
    taskId: 'task-1',
  },
  {
    id: 'subtask-3',
    title: 'Set up CI/CD pipeline',
    isCompleted: false,
    taskId: 'task-2',
  },
  {
    id: 'subtask-4',
    title: 'Deploy to staging',
    isCompleted: true,
    taskId: 'task-2',
  },
  {
    id: 'subtask-5',
    title: 'Write tests',
    isCompleted: false,
    taskId: 'task-3',
  },
];

// Testdaten für Tasks
export const testTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Prepare project plan',
    description: 'Outline the key steps for the project',
    boardId: 'board-1',
    boardStatusId: 'status-1',
    subTasks: testSubTasks.filter((subTask) => subTask.taskId === 'task-1'),
  },
  {
    id: 'task-2',
    title: 'Develop MVP',
    description: 'Build a minimum viable product',
    boardId: 'board-1',
    boardStatusId: 'status-2',
    subTasks: testSubTasks.filter((subTask) => subTask.taskId === 'task-2'),
  },
  {
    id: 'task-3',
    title: 'coffee break',
    description: 'coffee breaks are important',
    boardId: 'board-1',
    boardStatusId: 'status-2',
    subTasks: testSubTasks.filter((subTask) => subTask.taskId === 'task-3'),
  },
  {
    id: 'task-4',
    title: 'Launch product',
    description: 'Deploy the final version to production',
    boardId: 'board-2',
    boardStatusId: 'status-5',
    subTasks: testSubTasks.filter((subTask) => subTask.taskId === 'task-4'),
  },
];
