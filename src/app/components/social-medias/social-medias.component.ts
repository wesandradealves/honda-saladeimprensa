import { Component, OnInit } from '@angular/core';
import { SocialMedia } from 'src/app/models/social-media';
import { HomeService } from 'src/app/services/home.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-social-medias',
  templateUrl: './social-medias.component.html',
  styleUrls: ['./social-medias.component.scss']
})
export class SocialMediasComponent implements OnInit {

  socialMedias: Array<SocialMedia> = [];
  url: string = environment.src_url;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.loadSocialMedia();
  }

  loadSocialMedia() {
    this.homeService.getSocialMedia()
    .subscribe((data: any) => {
      data.forEach((item:any) => {
        var splitted = item.url.split("?");
        var splittedChannel = item.url.split("channel");
        if(splitted[0] == "https://www.youtube.com/watch") {
          item.type = 'video';
          var url_video = splitted[1].split("=");
          item.video = 'https://www.youtube.com/embed/' + url_video[1];
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
