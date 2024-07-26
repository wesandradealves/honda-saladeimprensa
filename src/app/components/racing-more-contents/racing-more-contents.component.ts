import { Component, OnInit } from '@angular/core';
import { RelatedPages } from 'src/app/models/related-pages';
import { PageService } from 'src/app/services/page.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-racing-more-contents',
  templateUrl: './racing-more-contents.component.html',
  styleUrls: ['./racing-more-contents.component.scss']
})
export class RacingMoreContentsComponent implements OnInit {

  url: string = environment.src_url;
  related: Array<RelatedPages> = [];

  constructor(private pageService: PageService) { }

  ngOnInit(): void {
    this.loadRelated();
  }

  loadRelated() {
    this.pageService.getSegmentRelated()
    .subscribe((data: any) => {
      data.forEach((item:any) => {
        this.related.push(item);
      })
    });
  }
  isSvg(url: string){
    return url?.endsWith(".svg");
}

}
