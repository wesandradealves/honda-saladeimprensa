import {
    Component,
    ElementRef,
    HostListener,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FileService } from 'src/app/services/file.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationModalComponent } from 'src/app/confirmation-modal/confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchService } from 'src/app/services/search.service';

@Component({
    selector: 'honda-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @ViewChild('searchContainer')
    searchContainer: ElementRef<HTMLElement>;

    @ViewChild('searchIcon')
    searchIcon: ElementRef<HTMLElement>;

    @ViewChild('modalButton')
    modalButton: ElementRef<HTMLElement>;

    @ViewChild('modalContainer')
    modalContainer: ElementRef<HTMLElement>;

    isLoading: boolean = false;
    menuOpened: Boolean = false;
    searchOpened = false;
    searchValue: string;

    counter: number = 0;
    myfiles: any[];
    showModalFiles: boolean = false;

    url: string = environment.src_url;

    email: string;
    confirmEmail: string;
    termAccept: Boolean = false;
    emailValid: Boolean = false;
    formValid: Boolean = false;
    zip = '';

    constructor(
        private fileService: FileService,
        private router: Router,
        private toastr: ToastrService,
        private modalService: NgbModal,
        private searchService: SearchService,
    ) {}

    ngOnInit(): void {
        if (!JSON.parse(localStorage.getItem('files'))) {
            localStorage.setItem('files', JSON.stringify([]));
        }

        this.checkFiles();
        document.addEventListener('storage', this._listener, true);
    }

    private _listener = () => {
        this.checkFiles();
    };

    @HostListener('document:click', ['$event'])
    clickout(event): void {
        if (
            !this.searchContainer.nativeElement.contains(event.target) &&
            !this.searchIcon.nativeElement.contains(event.target)
        ) {
            this.searchOpened = false;
        }
        if (
            !this.modalContainer?.nativeElement.contains(event.target) &&
            !this.modalButton?.nativeElement.contains(event.target)
        ) {
            this.showModalFiles = false;
        }
    }

    toSearch(e) {
        this.searchValue = e.target.value;
        e.target.value = '';
        e.target.blur();
    }

    search() {
        if (this.searchValue) {
            this.searchOpened = false;
            this.searchService.term = this.searchValue;
            this.router.navigate([`busca`]);
            this.searchValue = '';
        }
    }

    openModalFiles() {
        this.showModalFiles = !this.showModalFiles;
        this.modalService.dismissAll();
    }
    open() {
        this.showModalFiles = false;
        this.modalService.open(ConfirmationModalComponent, {
            modalDialogClass: 'confirm-modal',
        });
    }

    checkFiles() {
        this.myfiles = JSON.parse(localStorage.getItem('files'));
        this.counter = this.myfiles.length || 0;
    }

    onChangeEmail() {
        if (this.email && this.confirmEmail) {
            if (this.email !== this.confirmEmail) {
                this.emailValid = false;
            } else {
                this.emailValid = true;
            }
        } else {
            this.emailValid = false;
        }

        this.checkFormValid();
    }

    onChangeTermAccept() {
        this.termAccept = !this.termAccept;
        this.checkFormValid();
    }

    checkFormValid() {
        this.formValid = this.termAccept && this.emailValid ? true : false;
    }

    removeFile(i) {
        requestAnimationFrame(() => {
            this.myfiles.splice(i, 1);
            this.fileService.setFileList(this.myfiles);

            if (!this.myfiles.length) {
                this.showModalFiles = false;
            }
        });
    }

    removeAllFiles() {
        this.fileService.setFileList([]);
    }

    downloadAllFiles() {
        this.toastr.info('O arquivo está sendo gerado e será baixado em breve.', '', {
            disableTimeOut: true,
        });
        this.isLoading = true;
        this.fileService.downloadAllFiles().subscribe(
            (data: any) => {
                this.zip = data.link;
                setTimeout(() => {
                    document.getElementById('link-zip').click();
                    this.isLoading = false;
                    this.toastr.success(
                        'Arquivo gerado com sucesso. Download em andamento.',
                        'Download'
                    );
                    this.removeAllFiles();
                    this.openModalFiles();
                }, 50);
            },
            (err) => {
                this.isLoading = false;
                this.toastr.error('Houve um erro no download.', 'Error');
            }
        );
    }
}
