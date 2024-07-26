import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from '../../app/shared/base.service';
import { URL_API } from '../app.api';
import { EventInfo, EventDescription } from '../models/event';
import { HomeGallery } from '../models/home-gallery';

@Injectable({
    providedIn: 'root'
})
export class EventService extends BaseService {


    constructor(private http: HttpClient) {
        super()
    }

    getGeneralInfos(id: any): Observable<EventInfo[]> {
        return this.http.get<any>(`${URL_API}/evento/infos/${id}`)
        .pipe(catchError(this.handleError));
    }

    getDescription(id: any): Observable<EventDescription[]> {
        return this.http.get<any>(`${URL_API}/evento/desc/${id}`)
        .pipe(catchError(this.handleError));
    }

    getEventBanner(id: any): Observable<HomeGallery[]> {
        return this.http.get<any>(`${URL_API}/banner/evento/${id}`);
    }

    getReleases(id: any): Observable<EventInfo[]> {
        return this.http.get<any>(`${URL_API}/releases-event/${id}`);
    }

    getDescriptionBySlug(slug: string){
        return this.http.get<any>(`${URL_API}/evento/desc?alias=${slug}`)
    }
}
