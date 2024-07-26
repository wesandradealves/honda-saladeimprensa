import { Component, OnInit } from '@angular/core';
import { MetadataService } from 'src/app/services/metadata.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private metadataService: MetadataService) { }

    ngOnInit() {
        this.metadataService.updateMetadata({
            title: 'Honda - Sala de Imprensa',
            description: 'Sala de imprensa da Honda, confira nossos últimos releases sobre motocicletas, automóveis, motores e máquinas, e racing spirit',
            image: `${environment.src_url}/assets/img/honda_logo.png`,
        });
    }



}
