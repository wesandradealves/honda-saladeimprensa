import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from '../shared/base.service';
import { URL_API } from '../app.api';
import { ReleaseDetail } from '../models/release-detail';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService extends BaseService {

  constructor(private http: HttpClient) {
    super()
  }

  getRelease(releaseId: any): Observable<ReleaseDetail[]> {
    return this.http.get<ReleaseDetail[]>(`${URL_API}/release/${releaseId}`)
        .pipe(catchError(this.handleError));
  }

  getReleaseBySlug(slug: string): Observable<ReleaseDetail[]> {
    return this.http.get<ReleaseDetail[]>(`${URL_API}/release?alias=${slug}`)
        .pipe(catchError(this.handleError));
  }
}
