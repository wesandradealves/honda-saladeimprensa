import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HomeGallery } from '../models/home-gallery';
import { ProductCarousel } from '../models/product-carousel';
import { ProductVocabulary } from '../models/product-vocabulary';
import { Releases } from '../models/releases';
import { BannerPages } from '../models/banner-pages';
import { BaseService } from '../../app/shared/base.service';
import { URL_API } from '../app.api';
import { Taxonomy } from '../models/taxonomy';

@Injectable({
  providedIn: 'root'
})
export class TaxonomyService extends BaseService {

    constructor(private http: HttpClient) {
        super();
    }

    getTaxonomyInfo(slug: string): Observable<Taxonomy[]> {
        return this.http.get<any>(`${URL_API}/taxonomy-alias?alias=${slug}`)
    }
}
