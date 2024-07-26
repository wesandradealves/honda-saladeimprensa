import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileService } from 'src/app/services/file.service';
import * as fileSaver from 'file-saver';

@Component({
    selector: 'download-button',
    templateUrl: './download-button.component.html',
    styleUrls: ['./download-button.component.scss'],
})
export class DownloadButtonComponent implements OnInit {
    @Input() label;
    @Input() id: any;
    @Input() idList: any[] = [];
    @Input() origin;
    @Input() isImage?: boolean;
    @Input() isGallery?: boolean;
    @Input() insideModal?: boolean = false;
    @Input() galleryId?: any;
    @Input() releaseId?: any;

    zip = '';

    constructor(
        private fileService: FileService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {}

    download() {
        this.toastr.info('O arquivo será baixado em breve.', '', {
            disableTimeOut: true,
        });
        
        if (!this.isGallery) {
            this.fileService.checkFilesSize(this.origin, this.id).subscribe((resp: any) => {
                console.log(1, this)

                if(resp?.infos?.files) {
                    this.fileService.downloadFileSingle(this.origin, this.id, this.galleryId, this.releaseId).subscribe(
                        (data: any) => {
                            const name = resp.infos.files[0].name;
                            const type = resp.infos.files[0].type;

                            const blob = new Blob([data], {
                                type: type,
                            });
                            fileSaver.saveAs(blob, name);

                            this.toastr.success(
                                'Download em andamento.',
                                'Download'
                            );
                        },
                        (err) =>
                            this.toastr.error(
                                'Houve um erro no download.',
                                'Error'
                            )
                    );
                }
            });
        } else {
            const fileList = this.idList?.length ? this.idList : [this.id];
            this.fileService
                .checkMultipleFilesSizes(this.origin, fileList)
                .subscribe((resp: any) => {
                    this.fileService
                        .downloadMultipleFiles(this.origin, fileList, 'l')
                        .subscribe(
                            (data: any) => {
                                fileSaver.saveAs(data.link);
                                this.toastr.success(
                                    'Arquivo gerado com sucesso. Download em andamento.',
                                    'Download'
                                );
                            },
                            (err) =>
                                this.toastr.error(
                                    'Houve um erro no download.',
                                    'Error'
                                )
                        );
                });
        }
    }
}
