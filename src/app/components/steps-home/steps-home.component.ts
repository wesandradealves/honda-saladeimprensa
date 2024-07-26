import { Component, OnInit } from '@angular/core';
import { Steps } from 'src/app/models/steps';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-steps-home',
  templateUrl: './steps-home.component.html',
  styleUrls: ['./steps-home.component.scss']
})
export class StepsHomeComponent implements OnInit {

  steps: Array<Steps> = [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.loadSteps();
  }

  loadSteps() {
    this.homeService.getSteps()
    .subscribe((data: any) => {
      data.forEach((item:any) => {
        this.steps.push(item);
      })
    })
  }

}
