import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task/services/task.service';
import { Task, TaskStatus } from '../task/models/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  TaskStatus = TaskStatus;
  tasks: Task[] = [];
  currentUser: any;
  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.currentUser = currentUser ? JSON.parse(currentUser) : {};
    this.tasks = this.taskService.getTasks();
  }

  updateTaskStatus(id: number, status: TaskStatus): void {
    this.taskService.updateTaskStatus(id, status);
    this.tasks = this.taskService.getTasks();
  }

  goToTaskDetails(taskId: string): void {
    this.router.navigate(['/tasks', taskId]);
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.router.navigate(['/login']);
  }

}
