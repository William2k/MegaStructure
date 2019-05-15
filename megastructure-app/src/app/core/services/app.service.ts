import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  initialise(): void {
    console.log('Initialisation');
  }
}
