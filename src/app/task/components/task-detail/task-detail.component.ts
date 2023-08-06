import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task: any;
  newComment: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const taskId = params['taskId'];
      this.task = this.taskService.getTaskById(taskId);
    });
  }

  addComment(): void {
    const newCommentObj = {
      timestamp: new Date(),
      text: this.newComment
    };
    this.task.comments = newCommentObj;
    this.newComment = '';
    this.taskService.addCommentToTask(this.task, newCommentObj)
    this.router.navigate(['/dashboard']);
  }
}