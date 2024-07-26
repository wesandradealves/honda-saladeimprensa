import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from '../../app/shared/base.service';
import { URL_API } from '../app.api';
import { BannerPages } from '../models/banner-pages';

@Injectable({
    providedIn: 'root'
})
export class PowerProductService extends BaseService {


    constructor(private http: HttpClient) {
        super()
    }

    getBanners(): Observable<BannerPages[]> {
        return this.http.get<any>(`${URL_API}/banner/produtos-forca`)
        .pipe(catchError(this.handleError));
    }

}
