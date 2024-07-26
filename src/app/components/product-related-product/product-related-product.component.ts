import { Component, OnInit, Input } from '@angular/core';
import { Related } from 'src/app/models/related';
import { ProductService } from 'src/app/services/product.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-product-related-product',
    templateUrl: './product-related-product.component.html',
    styleUrls: ['./product-related-product.component.scss'],
})
export class ProductRelatedProductComponent implements OnInit {
    @Input() id: any;
    @Input() parentName: any;

    related: Array<Related> = [];
    titleBlock: string;
    url: string = environment.src_url;

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.getTitle();
        this.getRelated();
    }

    getTitle() {
        this.productService
            .getProductRecomendedTitle(this.id)
            .subscribe((data: any) => {
                this.titleBlock = data[0]['titulo-bloco'];
            });
    }

    getRelated() {
        this.productService
            .getProductRecomendedContent(this.id)
            .subscribe((data: any) => (this.related = data));
    }
}
