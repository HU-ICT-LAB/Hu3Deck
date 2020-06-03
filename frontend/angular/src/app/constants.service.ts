import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  readonly apiLocation : string = 'http://localhost:3000';
}
