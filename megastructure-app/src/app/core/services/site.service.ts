import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/core/services/api.service';
import { Site, SitePage } from '../models/site.model';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  constructor(private apiService: ApiService) {}

  getSites(): Observable<Site[]> {
    return this.apiService.get('site');
  }

  getSite(sitename: string, live: boolean = false): Observable<Site> {
    return this.apiService.get(`site/${live ? 'live/' : ''}${sitename}`);
  }

  addSite(site: Site): Observable<Site> {
    return this.apiService.post('site', site);
  }

  getPage(
    sitename: string,
    pageRef: number,
    live: boolean = false
  ): Observable<SitePage> {
    return this.apiService.get(
      `site/${live ? 'live/' : ''}${sitename}/page/${pageRef}`
    );
  }

  addPage(sitename: string, page: SitePage): Observable<Site> {
    return this.apiService.post(`site/page/${sitename}`, page);
  }
}
