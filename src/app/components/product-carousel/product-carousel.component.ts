import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { environment } from '../../../environments/environment';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

declare let $: any;

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.scss']
})
export class ProductCarouselComponent implements OnInit {
  @Input() parentName:any;
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;

  public products: any[] = new Array<any>();
  public productsFiltered: any[] = new Array<any>();
  public vocabulary: any[] = new Array<any>();
  public models: any[] = new Array<any>();
  public parentNameAPI: string;

  public categories: any[] = new Array<any>();

  countItems: number = 0;
  selectedCategory: number = 0;
  url: string = environment.src_url;
  globalId: number = 0;

  slideProductConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    infinite: true,
    arrows: true,autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1,
          infinite: true
        }
      }
    ]
  };


  constructor(private productService: ProductService) { }

  ngOnInit() {
    if(this.parentName == "automoveis") {
      this.globalId = 11;
      this.parentNameAPI = this.parentName;
    }
    else if(this.parentName == "produtos-de-forca") {
      this.globalId = 13;
      this.parentNameAPI = "produtos_de_forca";
    }
    else {
      this.globalId = 12;
      this.parentNameAPI = this.parentName;
    }
    this.loadCategories();
  }

  public loadCategories() {
    this.categories = [];
    this.productService.getProductVocabulary(this.parentName)
      .subscribe((data: any) => {
        data.forEach((item: any) => {
          this.categories.push(item);
        });
        this.loadProductsSegmented();
      });
  }

  public loadProducts() {
    // console.log(this.categories);
    this.selectedCategory = this.selectedCategory ? this.selectedCategory : this.categories[0].tid;
    // console.log(this.selectedCategory);
    this.products = [];
    this.productService.getProductCarousel(this.selectedCategory)
      .subscribe((data: any) => {
        data.forEach((item: any) => {
          this.products.push(item);
        });
        this.countItems = this.products.length;
        if(this.countItems > 0) {
          // console.log(this.countItems)
          while(this.countItems <= 5){
            // console.log(this.countItems)
            data.forEach((item: any) => {
              this.products.push(item);
            })
            this.countItems = this.products.length;
          }
        }
        // console.log(this.countItems)
      });
      // this.slideProductConfig.slidesToShow = Math.min(5, this.countItems - 1)

  }

  public loadProductsSegmented() {
    let line = "";
    let anchorBefore = 0;
    let count = -1;
    let countSegment = -1;
    let countItemSegment = 0;

    const categoriesSegment = this.categories;
    let categoriesSegmentAfter = [];
    this.categories = [];

    this.products = [];
    this.productService.getProductCarouselSegmented(this.parentNameAPI)
      .subscribe((data: any) => {
        data.forEach((item: any) => {
          count++;
          this.products.push(item);
        });

        countItemSegment = 0;
        categoriesSegment.forEach((category: any) => {
          line = "";
          countSegment = 0;
          data.forEach((item: any, index) => {
            if (category.tid == item.parent_target_id) {
              if (countSegment == 0 && !line) {
                line = category.tid;
                category.anchor = index;
              }
              countSegment++;
              countItemSegment++;
              if (countSegment > 0) {
                category.anchorAfter = countItemSegment;
              }
            }
          });
          this.categories.push(category);
        });
      });
  }

  public filterProducts(category: any) {
    this.selectedCategory = category;

    this.loadProducts();
  }
  public filterProductsMobile(event: any) {
    // console.log(event);
    let segment = event.target.value;

    $('.slider-product').slick('slickGoTo', segment);
  }

  public slideGoTo(index) {
      $('.slider-product').slick('slickGoTo', index);
  }

  public afterChange(e) {
    this.selectedCategory = e.currentSlide;
    // console.log(this.selectedCategory);
  }

  public beforeChange(e) {
    // console.log(e);
  }
}
