import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FooterMenu } from '../models/footer-menu';
import { FooterSocial } from '../models/footer-social';
import { BaseService } from '../../app/shared/base.service';
import { URL_API } from '../app.api';

@Injectable({
    providedIn: 'root'
})
export class FooterService extends BaseService {

    constructor(private http: HttpClient) {
        super()
    }

    getFooterSocial(): Observable<FooterSocial[]> {
        return this.http.get<FooterSocial[]>(`${URL_API}/menu_items/menu-footer-socials`)
            .pipe(catchError(this.handleError));
    }

    getFooterMenu(): Observable<FooterMenu[]> {
        return this.http.get<FooterMenu[]>(`${URL_API}/menu_items/menu-footer-segments`)
            .pipe(catchError(this.handleError));
    }

    getFooterMenuOther(): Observable<any> {
        return this.http.get<FooterMenu[]>(`${URL_API}/menu_items/menu-footer`)
            .pipe(catchError(this.handleError));
    }

}
