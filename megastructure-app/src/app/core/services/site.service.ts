import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import { Site } from '../models/site.model';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  constructor(private apiService: ApiService) {}

  add(form: Site): Observable<Site> {
    return this.apiService.post('site', form);
  }

  get(): Observable<Site[]> {
    return this.apiService.get('site');
  }
}
