import { Component, OnInit } from '@angular/core';
import { CopyrightNavigation } from 'src/app/models/copyright-navigation';
import { CopyrightNavigationService } from 'src/app/services/copyright-navigation.service';
import { ThemeSettings } from 'src/app/models/theme-settings';
import { ThemeSettingsService } from 'src/app/services/theme-settings.service';

@Component({
  selector: 'honda-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  navigation: Array<CopyrightNavigation> = [];
  settings: ThemeSettings;

  constructor(
    private CopyrightNavigationService: CopyrightNavigationService,
    private ThemeSettingsService: ThemeSettingsService
  ) {
  }

  ngOnInit()  {
    this.getNavigation();
    this.getThemeSettings();
  }

  public getThemeSettings() {
      this.ThemeSettingsService.getThemeSettings().subscribe((data: any) => {
          if(data) {
            this.settings = JSON.parse(data);
          }
      });
  }

  public getNavigation() {
      this.CopyrightNavigationService.getNavigation().subscribe((data: any) => {
          this.navigation = data;
      });
  }
}
