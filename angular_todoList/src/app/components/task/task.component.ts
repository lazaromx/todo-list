import { Component, Input } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})

export class TaskComponent {
  valor: string = '';
  todos: string[] = [];
  
  constructor(
    private dataService: DataSharingService
  ){}

  ngOnInit(){
    this.dataService.dadoAtual$.subscribe((dado) => {
      this.todos.push(this.valor);
      this.valor = dado;
      
    });
  };
}
