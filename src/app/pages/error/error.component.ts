import { Component, OnInit } from '@angular/core';
import { Error } from 'src/app/models/error';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  error: Array<Error> = [];

  constructor(private pageService: PageService) { }

  ngOnInit(): void {
    this.load404Page();
  }

  load404Page() {
    this.pageService.get404Page()
    .subscribe((data: any) => {
      data.forEach((item:any) => {
        this.error.push(item);
      })
    })
  }

}
