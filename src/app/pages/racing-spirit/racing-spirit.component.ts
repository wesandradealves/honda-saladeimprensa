import { Component, OnInit } from '@angular/core';
import { PostsPages } from 'src/app/models/posts-pages';
import { PageService } from 'src/app/services/page.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-racing-spirit',
  templateUrl: './racing-spirit.component.html',
  styleUrls: ['./racing-spirit.component.scss']
})
export class RacingSpiritComponent implements OnInit {

  posts: Array<PostsPages> = [];

  url: string = environment.src_url;

  constructor(private pageService: PageService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    this.pageService.getSegmentPosts()
    .subscribe((data: any) => {
      data.forEach((item:any) => {
        this.posts.push(item);
      })
    });
    // console.log(this.posts);
  }

}
