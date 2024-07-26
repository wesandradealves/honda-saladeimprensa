import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-honda-global',
  templateUrl: './honda-global.component.html',
  styleUrls: ['./honda-global.component.scss']
})
export class HondaGlobalComponent implements OnInit {
  id: number;
  name: string;
  rota: string;
  type: string;
  page: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.id = parseInt(params.id, 10));
  }

  ngOnInit(): void {
    this.page = this.id.toString();

    if (this.id === 11) {
      this.name = 'Automóveis';
      this.rota = '/automoveis';
      this.type = 'automoveis';
    }
    else if (this.id === 12) {
      this.name = 'Motocicletas';
      this.rota = '/motocicletas';
      this.type = 'motocicletas';
    }
    else if (this.id === 13) {
      this.name = 'Motores e Máquinas';
      this.rota = '/motores-e-maquinas';
      this.type = 'produtos-de-forca';
    }

    console.log('aquiglobal', this.name, this.rota);
  }

}
