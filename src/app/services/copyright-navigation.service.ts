import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CopyrightNavigation } from '../models/copyright-navigation';
import { BaseService } from '../../app/shared/base.service';
import { URL_API } from '../app.api';

@Injectable({
    providedIn: 'root',
})
export class CopyrightNavigationService extends BaseService {
    constructor(private http: HttpClient) {
        super();
    }
    getNavigation(): Observable<CopyrightNavigation[]> {
        return this.http
            .get<CopyrightNavigation[]>(`${URL_API}/menu/copyright`)
            .pipe(catchError(this.handleError));
    }
}
