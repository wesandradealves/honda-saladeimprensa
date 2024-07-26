import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ThemeSettings } from '../models/theme-settings';
import { BaseService } from '../../app/shared/base.service';
import { URL_API } from '../app.api';

@Injectable({
    providedIn: 'root',
})
export class ThemeSettingsService extends BaseService {
    constructor(private http: HttpClient) {
        super();
    }
    getThemeSettings(): Observable<ThemeSettings[]> {
        return this.http
            .get<ThemeSettings[]>(`${URL_API}/theme-settings`)
            .pipe(catchError(this.handleError));
    }
}
