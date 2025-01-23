import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-task-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-input.component.html',
  styleUrl: './task-input.component.scss'
})
export class TaskInputComponent {
  todo: string = '';
  todoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataSharingService
  ){}

  ngOnInit(){
    this.todoForm = this.formBuilder.group({
      todo: new FormControl('', [Validators.required])
    })
  }
  submitTodo(){
    this.dataService.atualizarDado(this.todo);
  }
}
