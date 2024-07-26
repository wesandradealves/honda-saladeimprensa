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

@Injectable({
    providedIn: 'root',
})
export class ProductService extends BaseService {
    constructor(private http: HttpClient) {
        super();
    }

    getPhotoGallery(id: any): Observable<HomeGallery[]> {
        return this.http.get<any>(
            `${URL_API}/inner/photo-gallery-new/segment/${id}`
        );
    }

    getVideoGallery(id: any): Observable<HomeGallery[]> {
        return this.http.get<any>(
            `${URL_API}/inner/video-gallery-new/segment/${id}`
        );
    }

    getMediaGalleryPaginated(
        type: 'video' | 'photo',
        page: any,
        id: any,
        itemsPerPage = 10,
        isGlobal = false
    ): Observable<HomeGallery[]> {
        let params = new HttpParams()
            .set('page', page)
            .set('items_per_page', `${itemsPerPage}`);

        return this.http.get<any>(
            `${URL_API}/inner/${type}-gallery-new/${
                isGlobal ? 'global' : 'segment'
            }/${id}`,
            { params: params }
        );
    }

    getProductVocabulary(segment: any): Observable<ProductVocabulary[]> {
        return this.http.get<any>(`${URL_API}/get-vocabulary/${segment}`);
    }

    getProductCarousel(id: any): Observable<ProductCarousel[]> {
        return this.http.get<any>(`${URL_API}/get-filter/${id}`);
    }

    getProductCarouselSegmented(id: any): Observable<ProductCarousel[]> {
        return this.http.get<any>(`${URL_API}/get-filter-segmented/${id}`);
    }

    getProductRelease(id: any): Observable<Releases[]> {
        return this.http.get<any>(`${URL_API}/releases-product/${id}`);
    }

    getProductPhotoGallery(id: any): Observable<HomeGallery[]> {
        return this.http.get<any>(`${URL_API}/product/photo-gallery/${id}`);
    }

    getProductVideoGallery(id: any): Observable<HomeGallery[]> {
        return this.http.get<any>(`${URL_API}/product/video-gallery/${id}`);
    }

    getSocialMedia(page: any): Observable<HomeGallery[]> {
        return this.http.get<any>(`${URL_API}/redessociais/${page}`);
    }

    getRecomendedContent(page: any): Observable<HomeGallery[]> {
        return this.http.get<any>(`${URL_API}/recomendados/${page}`);
    }

    getProductRecomendedTitle(id: any): Observable<HomeGallery[]> {
        return this.http.get<any>(`${URL_API}/recomendados/titulo-bloco/${id}`);
    }

    getProductRecomendedContent(id: any): Observable<HomeGallery[]> {
        return this.http.get<any>(`${URL_API}/recomendados/produto/${id}`);
    }

    getProductGlobalReleases(id: any): Observable<HomeGallery[]> {
        return this.http.get<any>(`${URL_API}/releases-global-segment/${id}`);
    }

    getProductGlobalPhotos(id: any): Observable<HomeGallery[]> {
        return this.http.get<any>(
            `${URL_API}/inner/photo-gallery-new/global/${id}`
        );
    }

    getProductGlobalVideos(id: any): Observable<HomeGallery[]> {
        return this.http.get<any>(
            `${URL_API}/inner/video-gallery-new/global/${id}`
        );
    }

    getBanners(page: any): Observable<BannerPages[]> {
        return this.http
            .get<any>(`${URL_API}/banner/${page}`)
            .pipe(catchError(this.handleError));
    }

    getCorporativeBanners(id: any): Observable<BannerPages[]> {
        return this.http
            .get<any>(`${URL_API}/banner/pages/${id}`)
            .pipe(catchError(this.handleError));
    }

    getProductGlobalBanner(id: any): Observable<HomeGallery[]> {
        return this.http.get<any>(`${URL_API}/banner/global/${id}`);
    }

    getCorporativeRelated(id: any): Observable<HomeGallery[]> {
        return this.http.get<any>(`${URL_API}/recomendados/corporativo/${id}`);
    }
}
