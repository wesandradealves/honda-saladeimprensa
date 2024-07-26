import { Component, OnInit } from '@angular/core';
import { SocialMedia } from 'src/app/models/social-media';
import { HomeService } from 'src/app/services/home.service';
import { SocialMediaPages } from 'src/app/models/social-media-pages';
import { PageService } from 'src/app/services/page.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-racing-social-media',
  templateUrl: './racing-social-media.component.html',
  styleUrls: ['./racing-social-media.component.scss']
})
export class RacingSocialMediaComponent implements OnInit {

  socialMedias: Array<SocialMediaPages> = [];
  url: string = environment.src_url;

  constructor(private pageService: PageService) { }

  ngOnInit(): void {
    this.loadSocialMedia();
  }

  loadSocialMedia() {
    this.pageService.getSegmentSocialMedia()
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
