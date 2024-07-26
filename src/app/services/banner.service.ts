import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HomeBanner } from '../models/home-banner';
import { BaseService } from '../../app/shared/base.service';
import { URL_API } from '../app.api';

@Injectable({
    providedIn: 'root',
})
export class BannerService extends BaseService {
    constructor(private http: HttpClient) {
        super();
    }
    getBanners(): Observable<HomeBanner[]> {
        return this.http
            .get<HomeBanner[]>(`${URL_API}/banner/home`)
            .pipe(catchError(this.handleError));
    }

    getContactBanner(): Observable<HomeBanner[]> {
        return this.http
            .get<HomeBanner[]>(`${URL_API}/banner/contato`)
            .pipe(catchError(this.handleError));
    }
}
