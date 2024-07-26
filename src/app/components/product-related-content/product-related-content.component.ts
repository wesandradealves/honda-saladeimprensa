import { Component, OnInit, Pipe, PipeTransform, Input } from '@angular/core';
import { Related } from 'src/app/models/related';
import { HomeService } from 'src/app/services/home.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) { }
    transform(value: any) {
        console.log(this.sanitized.bypassSecurityTrustHtml(value))
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}

@Component({
    selector: 'app-product-related-content',
    templateUrl: './product-related-content.component.html',
    styleUrls: ['./product-related-content.component.scss']
})
export class ProductRelatedContentComponent implements OnInit {
    @Input() id: any;
    @Input() parentName: any;
    @Input() corporative: any;

    related: Array<Related> = [];
    url: string = environment.src_url;

    constructor(private productService: ProductService, private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.getRelated();
    }

    getRelated() {
        if (this.corporative) {
            this.productService.getCorporativeRelated(this.parentName)
            .subscribe((data: any) => {
                data.forEach((item: any) => {
                    this.related.push(item);
                })
            })
        }
        else {
            this.productService.getRecomendedContent(this.parentName)
                .subscribe((data: any) => {
                    data.forEach((item: any) => {
                        this.related.push(item);
                    })
                })
        }

        // console.log(this.related);
    }
    isSvg(url: string){
        return url?.endsWith(".svg");
    }
    

}
