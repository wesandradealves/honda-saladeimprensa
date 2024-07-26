import { Component, OnInit } from '@angular/core';
import { FooterSocial } from 'src/app/models/footer-social';
import { FooterService } from 'src/app/services/footer.service';

@Component({
  selector: 'footer-socials',
  templateUrl: './footer-socials.component.html',
  styleUrls: ['./footer-socials.component.scss']
})
export class FooterSocialsComponent implements OnInit {
    socialItem: Array<FooterSocial> = [];
  constructor(private footerService: FooterService) { }

  ngOnInit() {
    this.loadSocials();
  }

  loadSocials() {
    this.footerService.getFooterSocial()
    .subscribe((data: any) => {
      data.forEach((item:any) => {
        var slugify = require('slugify')

        item.icon = `fa-brands fa-${slugify(item.title.toLowerCase().includes('facebook') ? `${item.title}-f` : item.title, {
          replacement: '-',  
          remove: undefined, 
          lower: true,      
          strict: true,     
          trim: true         
        })}`;

        this.socialItem.push(item);
      })
    })
  }

}
