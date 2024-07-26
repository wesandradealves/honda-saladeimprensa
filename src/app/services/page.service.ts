import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Page } from '../models/page';
import { Error } from '../models/error';
import { BaseService } from '../../app/shared/base.service';
import { URL_API } from '../app.api';
import { BannerPages } from '../models/banner-pages';
import { PostsPages } from '../models/posts-pages';
import { RelatedPages } from '../models/related-pages';
import { SocialMediaPages } from '../models/social-media-pages';
import { Contact } from '../models/contact';
import { CorporateExtra } from '../models/corporate-extra';

@Injectable({
    providedIn: 'root'
})
export class PageService extends BaseService {


    constructor(private http: HttpClient) {
        super()
    }

    getPages(): Observable<Page[]> {
        return this.http.get<Page[]>(`${URL_API}/menu_items/menu-header`)
        .pipe(catchError(this.handleError));
    }

    get404Page(): Observable<Error[]> {
        return this.http.get<any>(`${URL_API}/page-404`)
        .pipe(catchError(this.handleError));
    }

    getSegmentBanners(): Observable<BannerPages[]> {
        return this.http.get<any>(`${URL_API}/banner/spirit`)
        .pipe(catchError(this.handleError));
    }

    getSegmentPosts(): Observable<PostsPages[]> {
        return this.http.get<any>(`${URL_API}/posts/spirit`)
        .pipe(catchError(this.handleError));
    }

    getSegmentRelated(): Observable<RelatedPages[]> {
        return this.http.get<any>(`${URL_API}/recomendados/spirit`)
        .pipe(catchError(this.handleError));
    }

    getSegmentSocialMedia(): Observable<SocialMediaPages[]> {
        return this.http.get<any>(`${URL_API}/redessociais/spirit`)
        .pipe(catchError(this.handleError));
    }
    getContacts(): Observable<Contact[]> {
        return this.http.get<any>(`${URL_API}/contacts`)
        .pipe(catchError(this.handleError));
    }
    getCorporateExtra(id: any): Observable<CorporateExtra[]> {
        return this.http.get<any>(`${URL_API}/inner/corporate-extra/${id}`)
        .pipe(catchError(this.handleError));
    }

    getCorporativeReleases(id: any): Observable<RelatedPages[]> {
        return this.http.get<any>(`${URL_API}/releases-corporate/${id}`)
        .pipe(catchError(this.handleError));
    }

    getCorporativeReleasesPaginated(page: any, id: any): Observable<RelatedPages[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const params = new HttpParams()
            .set('page', page)
            .set('items_per_page', '10');

        return this.http.get<any>(`${URL_API}/releases-corporate/${id}`, {
            headers: headers,
            params: params,
        }).pipe(catchError(this.handleError));
    }

    getCorporativePhotoGallery(page: any, id: any): Observable<RelatedPages[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const params = new HttpParams()
            .set('page', page)
            .set('items_per_page', '10');

        return this.http.get<any>(`${URL_API}/corporate/photo-gallery-new/${id}`, {
            headers: headers,
            params: params,
        }).pipe(catchError(this.handleError));
    }

    getCorporativeVideoGallery(page: any, id: any): Observable<RelatedPages[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const params = new HttpParams()
            .set('page', page)
            .set('items_per_page', '10');
            
        return this.http.get<any>(`${URL_API}/corporate/video-gallery-new/${id}`, {
            headers: headers,
            params: params,
        }).pipe(catchError(this.handleError));
    }

    getCorporativeRelated(id: any): Observable<RelatedPages[]> {
        return this.http.get<any>(`${URL_API}/recomendados/spirit`)
        .pipe(catchError(this.handleError));
    }
}
