import { Component, OnInit, Input } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
    selector: 'add-cart-button',
    templateUrl: './add-cart-button.component.html',
    styleUrls: ['./add-cart-button.component.scss'],
})
export class AddCartButtonComponent implements OnInit {
    @Input() id: any;

    constructor(private fileService: FileService) {}

    ngOnInit(): void {}

    get alreadyInCart() {
        return !!this.fileService.hasFileCart(this.id);
    }
}
