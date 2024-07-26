import {
    Component,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    TemplateRef,
    AfterViewInit,
} from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileService } from '../services/file.service';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    // add NgbModalConfig and NgbModal to the component providers
    providers: [NgbModalConfig, NgbModal],
})
export class ConfirmationModalComponent {
    @ViewChild('modal') modal: TemplateRef<any>;

    constructor(
        config: NgbModalConfig,
        private modalService: NgbModal,
        private fileService: FileService
    ) {
        // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = false;
    }

    removeAllFiles() {
        this.fileService.setFileList([]);
        this.modalService.dismissAll();
    }
    close() {
        this.modalService.dismissAll();
    }
}
