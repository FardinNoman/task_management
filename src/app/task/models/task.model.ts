export interface Task {
    id: any;
    title: string;
    description: string;
    dueDate:any;
    assignToId:any,
    assigneeEmail:any,
    status: TaskStatus;
    comment:any
  }
  
  export enum TaskStatus {
    ToDo = 'To-Do',
    InProgress = 'In Progress',
    Done = 'Done',
  }
  