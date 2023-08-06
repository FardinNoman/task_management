import { Injectable } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';

const STORAGE_KEY = 'tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  currentUser: any;
  constructor() {
    this.loadTasks();
  }

  getTaskById(taskId: string): any {
    let task = this.tasks.find(task => task.id == taskId);
    return task;
  }

  private loadTasks(): void {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  }

  private saveTasks(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
  }

  createTask(task: Task): void {
    task.id = this.tasks.length + 1;
    this.tasks.push(task);
    this.saveTasks();
  }

  addCommentToTask(task: any, comment: any) {
    const taskIndex = this.tasks.findIndex(x => x == task);
    this.tasks[taskIndex].comment = comment;
    this.saveTasks();
  }

  updateTaskStatus(id: number, status: TaskStatus): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.status = status;
      this.saveTasks();
    }
  }

  getTasks(): Task[] {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
    const currentUser = localStorage.getItem('currentUser');
    this.currentUser = currentUser ? JSON.parse(currentUser) : {};
    this.tasks = this.tasks.filter(x => x.assignToId == this.currentUser.id);
    return this.tasks.slice();
  }
}
