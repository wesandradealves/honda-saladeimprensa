import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { ProductBanner } from 'src/app/models/product-banner';
import { BaseService } from '../../app/shared/base.service';
import { URL_API } from '../app.api';

interface CartItemOptions {
    origin: 'products' | 'files' | 'galleries';
    info?: any;
    id: number | string;
    size?: 'l' | 'm' | 's';
    gallery_id?: number;
    product_id?: number[];
    release_id?: number;
}

@Injectable({
    providedIn: 'root',
})
export class FileService extends BaseService {
    constructor(private http: HttpClient) {
        super();
    }

    hasFileCart(id): boolean {
        const files = JSON.parse(localStorage.getItem('files'));
        return files.find((file) => file.id == id);
    }

    addToCart(file: CartItemOptions): void {
        const { id, size } = file;
        const files = JSON.parse(localStorage.getItem('files'));

        let hasFile = false;

        const filteredFiles = files?.filter((f) => {
            if (Number(f.id) === Number(id) && f.size === size) {
                hasFile = true;
                return false;
            } else {
                return true;
            }
        });

        if (!hasFile) {
            filteredFiles.push(file);
        }

        this.setFileList(filteredFiles);
    }

    setCart(origin, info, id, size?, release_id?): void {
        this.addToCart({ origin, info, id, size, release_id });
    }

    checkAllFilesSizes(): Observable<any> {
        const files = JSON.parse(localStorage.getItem('files'));

        const payload = {
            galleries: files?.filter((file) => file.origin === 'galleries'),
            products: files?.filter((file) => file.origin === 'products'),
            files: files?.filter((file) => file.origin === 'files'),
        };

        return this.http.post<any>(`${URL_API}/file-size`, payload);
    }

    downloadAllFiles(): Observable<any> {
        const files = JSON.parse(localStorage.getItem('files'));
        const payload = {
            galleries: files?.filter((file) => file.origin === 'galleries'),
            products: files?.filter((file) => file.origin === 'products'),
            files: files?.filter((file) => file.origin === 'files')
        };
        return this.http.post<any>(`${URL_API}/file-download`, payload);
    }

    checkFilesSize(origin, id): Observable<any> {
        return this.checkMultipleFilesSizes(origin, [id]);
    }

    checkMultipleFilesSizes(origin, idList: any[]): Observable<any> {
        const files = idList.filter(Boolean).map((id) => ({ id }));

        const payload = {
            galleries: origin === 'galleries' ? files : [],
            products: origin === 'products' ? files : [],
            files: origin === 'files' ? files : [],
        };

        return this.http.post<any>(`${URL_API}/file-size`, payload);
    }

    downloadMultipleFiles(origin, idList: any[], size?): Observable<any> {
        const files = idList.filter(Boolean).map((id) => ({ id, size }));

        const payload = {
            galleries: origin === 'galleries' ? files : [],
            products: origin === 'products' ? files : [],
            files: origin === 'files' ? files : [],
        };

        return this.http.post<any>(`${URL_API}/file-download`, payload);
    }

    downloadFileSingle(origin, id, galleryId?, releaseId?) {
        id = parseInt(id);
        const file = {
            id,
        };

        const payload = {
            galleries: origin === 'galleries' ? [{ ...file, size: 'm' }] : [{id: Number(galleryId)}],
            products: origin === 'products' ? [{ ...file }] : [],
            files: origin === 'files' ? [{ ...file }] : [],
            releases: origin === 'releases' ? [{ ...file }] : releaseId ? [{id: Number(releaseId)}] : [],
        };

        console.log(2, payload)

        return this.http.post<any>(`${URL_API}/file-single`, payload, {
            responseType: 'blob' as 'json',
        });
    }
    download(origin, id, size?): Observable<any> {
        const file = {
            id,
            size,
        };

        const payload = {
            galleries: origin === 'galleries' ? [file] : [],
            products: origin === 'products' ? [{ ...file, size: 's' }] : [],
            files: origin === 'files' ? [file] : [],
            releases: origin === 'releases' ? [{ ...file }] : [],
        };
        return this.http.post<any>(`${URL_API}/file-download`, payload);
    }

    setFileList(files: any[]) {
        localStorage.setItem('files', JSON.stringify(files));
        document.dispatchEvent(new Event('storage'));
    }
}
