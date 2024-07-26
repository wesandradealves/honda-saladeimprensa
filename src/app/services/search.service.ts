import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from '../../app/shared/base.service';
import { URL_API } from '../app.api';
import { SearchItem } from '../models/search';

@Injectable({
    providedIn: 'root',
})
export class SearchService extends BaseService {
    term: string;
    constructor(private http: HttpClient) {
        super();
    }

    getSearch(
        searchTerm: string,
        page: number,
        filterCategorias?: string,
        filterTypes?: string,
        period?: any
    ): Observable<SearchItem[]> {
        let url = `${URL_API}/search?page=${page}`;
        let filters = '';

        if (filterCategorias) {
            url = `${URL_API}/search?segment=${filterCategorias}&page=${page}`;
        }

        if (searchTerm) {
            filters += `&s=${searchTerm}`;
        }

        if (period?.from) {
            filters += `&created_min=${period.from}`;
        }
        
        if (period?.to) {
            filters += `&created_max=${period.to}+1day`;
        } 

        if (filterTypes) {
            filters += filterTypes;
        }

        return this.http
            .get<any>(`${url}${filters}`)
            .pipe(catchError(this.handleError));
    }
    
}
