import { Component, OnInit, Input } from '@angular/core';
import { Releases } from 'src/app/models/releases';
import { ProductService } from 'src/app/services/product.service';
import { environment } from '../../../environments/environment';
import { FileService } from 'src/app/services/file.service';

declare let $: any;

@Component({
  selector: 'app-product-release',
  templateUrl: './product-release.component.html',
  styleUrls: ['./product-release.component.scss']
})
export class ProductReleaseComponent implements OnInit {
  @Input() id:any;
  @Input() name:any;
  @Input() nameParent:any;

  public releases: any[] = new Array<any>();
  public releasesFiltered: any[] = new Array<any>();
  public segments: any[] = new Array<any>();
  selectedSegment: number = 0;
  url: string = environment.src_url;

  constructor(private productService: ProductService, public fileService: FileService) { }

  ngOnInit() {
      this.loadLastReleases();

  }

  public loadLastReleases() {
    this.releases = [];
    this.productService.getProductRelease(this.id)
        .subscribe((data: any) => {
            data.rows.forEach((item: any) => {
                    this.releases.push(item);
            });
        });
  }


  addToCart(id, title, thumb, release_id) {
    const info = {
        id,
        title,
        thumb,
        type: 'Release'
    }
    this.fileService.setCart('files', info, id, 'l', release_id);
  }
}
