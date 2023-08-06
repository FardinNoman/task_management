import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task, TaskStatus } from '../../models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  taskForm: FormGroup;
  users: any[] = [];
  minDate: string;
  currentUser: any;

  constructor(private router: Router, private taskService: TaskService, private fb: FormBuilder) {
    this.minDate = new Date().toISOString().split('T')[0];
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [null, Validators.required],
      assignToId: ['', Validators.required],
      assigneeEmail: [''],
      status: TaskStatus.ToDo
    });
  }
  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
  }

  createTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    const currentUser = localStorage.getItem('currentUser');
    this.currentUser = currentUser ? JSON.parse(currentUser) : {};
    this.taskForm.value.assigneeEmail = this.currentUser.email;
    this.taskService.createTask(this.taskForm.value);
    this.taskForm.reset();
    this.router.navigate(['/dashboard']);
  }

}
