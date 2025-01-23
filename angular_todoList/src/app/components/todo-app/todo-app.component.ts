import { Component } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { TaskInputComponent } from '../task-input/task-input.component';
import { FilterComponent } from '../filter/filter.component';
import { TitleComponent } from '../title/title.component';

@Component({
  selector: 'app-todo-app',
  standalone: true,
  imports: [TaskComponent, TaskInputComponent, FilterComponent, TitleComponent],
  templateUrl: './todo-app.component.html',
  styleUrl: './todo-app.component.scss'
})
export class TodoAppComponent {

}
