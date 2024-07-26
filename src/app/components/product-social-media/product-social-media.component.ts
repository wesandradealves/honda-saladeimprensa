import { Component, OnInit, Input } from '@angular/core';
import { SocialMedia } from 'src/app/models/social-media';
import { HomeService } from 'src/app/services/home.service';
import { ProductService } from 'src/app/services/product.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-social-media',
  templateUrl: './product-social-media.component.html',
  styleUrls: ['./product-social-media.component.scss']
})
export class ProductSocialMediaComponent implements OnInit {
  @Input() parentName:any;

  socialMedias: Array<SocialMedia> = [];
  url: string = environment.src_url;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadSocialMedia();
  }

  loadSocialMedia() {
    this.productService.getSocialMedia(this.parentName)
    .subscribe((data: any) => {
      data.forEach((item:any) => {
        var splitted = item.url.split("?");
        var splittedChannel = item.url.split("channel");
        if(splitted[0] == "https://www.youtube.com/watch") {
          item.type = 'video';
          var url_video = splitted[1].split("=");
          item.video = url_video[1];
        }
        else {
          item.type = 'photo';
        }

        if(splittedChannel[0] == "https://www.youtube.com/") {
          item.type = 'channel';
        }
        this.socialMedias.push(item);
      })
    })
  }

}
