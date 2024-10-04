export type SubTask = {
  id: string;
  title: string;
  isCompleted: boolean;
  taskId: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  boardId: string;
  boardStatusId: string;
  subTasks: SubTask[];
};
