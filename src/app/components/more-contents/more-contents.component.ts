import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Related } from 'src/app/models/related';
import { HomeService } from 'src/app/services/home.service';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value:any) {
    console.log(this.sanitized.bypassSecurityTrustHtml(value))
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-more-contents',
  templateUrl: './more-contents.component.html',
  styleUrls: ['./more-contents.component.scss']
})
export class MoreContentsComponent implements OnInit {

  @Input() page = 'home';
  related: Array<Related> = [];
  url: string = environment.src_url;

  constructor(private homeService: HomeService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getRelated();
  }

  getRelated() {
    this.homeService.getRelated(this.page)
    .subscribe((data: any) => {
      data.forEach((item:any) => {
        this.related.push(item);
      })
    })
  }
  isSvg(url: string){
      return url?.endsWith(".svg");
  }
  

}
