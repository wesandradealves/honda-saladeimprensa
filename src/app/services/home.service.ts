import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeGallery } from '../models/home-gallery';
import { Steps } from '../models/steps';
import { Releases } from '../models/releases';
import { ReleasesSegments } from '../models/releases-segments';
import { Related } from '../models/related';
import { SocialMedia } from '../models/social-media';
import { BaseService } from '../../app/shared/base.service';
import { URL_API } from '../app.api';

@Injectable({
    providedIn: 'root',
})
export class HomeService extends BaseService {
    selectedSegment: number;

    constructor(private http: HttpClient) {
        super();
    }

    getSteps(): Observable<Steps[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        return this.http.get<any>(`${URL_API}/home-step-by-step`, httpOptions);
    }

    getLastReleases(): Observable<Releases[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        return this.http.get<any>(`${URL_API}/releases`, httpOptions);
    }

    getReleasesFiltered(id: any): Observable<Releases[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        return this.http.get<any>(`${URL_API}/releases/${id}`, httpOptions);
    }

    getReleasesPaginated(n: any, id: any): Observable<Releases[]> {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        let params = new HttpParams()
            .set('page', n)
            .set('items_per_page', '10');

        return this.http.get<any>(URL_API + '/releases/' + id, {
            headers: headers,
            params: params,
        });
    }

    getSocialMedia(): Observable<SocialMedia[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        return this.http.get<any>(`${URL_API}/redessociais/home`, httpOptions);
    }

    getReleasesSegments(): Observable<ReleasesSegments[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        return this.http.get<any>(`${URL_API}/releases-filter`, httpOptions);
    }

    getRelated(page = 'home'): Observable<Related[]> {
        let url;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        switch (page) {
            case 'home':
                url = `${URL_API}/recomendados/home`;
                break;
            case '11':
                url = `${URL_API}/recomendados/segmento/11`;
                break;
            case '12':
                url = `${URL_API}/recomendados/segmento/12`;
                break;
            case '13':
                url = `${URL_API}/recomendados/segmento/13`;
                break;
            default:
                url = `${URL_API}/recomendados/home`;
                break;
        }
        return this.http.get<any>(url, httpOptions);
    }

    getGallery(): Observable<HomeGallery[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        return this.http.get<any>(`${URL_API}/home/gallery`, httpOptions);
    }

    getBannerFeatureGallery(): Observable<any> {
        return this.http.get<any>(`${URL_API}/banner/featured-gallery`);
    }

    getPhotosGallery(id: any): Observable<HomeGallery[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        return this.http.get<any>(
            `${URL_API}/gallery/content/${id}`,
            httpOptions
        );
    }
}
