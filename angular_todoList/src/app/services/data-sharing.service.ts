import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private data = new BehaviorSubject<string>('');
  dadoAtual$ = this.data.asObservable();

  atualizarDado(valor: string) {
    this.data.next(valor);
  }

  constructor() { }
}
