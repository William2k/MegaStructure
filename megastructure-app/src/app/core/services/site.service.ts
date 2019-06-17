import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import { Site, SitePage } from '../models/site.model';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  constructor(private apiService: ApiService) {}

  add(site: Site): Observable<Site> {
    return this.apiService.post('site', site);
  }

  addPage(sitename: string, page: SitePage): Observable<SitePage> {
    return this.apiService.post(`site/page/${sitename}`, page);
  }

  get(): Observable<Site[]> {
    return this.apiService.get('site');
  }
}
