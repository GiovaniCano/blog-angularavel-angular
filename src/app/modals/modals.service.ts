import { Injectable } from '@angular/core';
import { Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {  
  confirmModal = new Subject<boolean>()
  confirmModal$ = this.confirmModal.asObservable().pipe(take(1))

  constructor() { }
}
