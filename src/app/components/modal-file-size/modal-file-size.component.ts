import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FileService } from 'src/app/services/file.service';

interface IFileSizeProps {
    label: string;
    size?: number;
    value: string;
    resolution?: string;
}

const labelSizeMap = {
    s: 'Pequena',
    m: 'Média',
    l: 'Original',
};

@Component({
    selector: 'app-modal-file-size',
    templateUrl: './modal-file-size.component.html',
    styleUrls: ['./modal-file-size.component.scss'],
})
export class ModalFileSizeComponent implements OnInit, OnDestroy {
    @Input() origin: string;
    @Input() id?: number;
    @Input() videoIds?: { [key: string]: number };
    @Output() onSizeClicked: EventEmitter<string> = new EventEmitter();

    isLoading: boolean = true;
    fileSizes: IFileSizeProps[] = [];
    private subscription: Subscription;

    constructor(private fileService: FileService) {}

    ngOnInit(): void {
        const tmpVideosIds = this.videoIds
            ? Object.values(this.videoIds).filter(Boolean)
            : [];

        this.subscription = this.fileService
            .checkMultipleFilesSizes(
                this.origin,
                tmpVideosIds.length ? tmpVideosIds : [this.id]
            )
            .subscribe(
                (resp) => {
                    let tmpFiles = [];
                    let { files } = resp.infos;

                    if (Array.isArray(files)) {
                        files = files
                            // ignore duplicated resolutions images, keeping only the greater specified size
                            .reduceRight((accumulated, current) => {
                                if (
                                    current.width &&
                                    accumulated.some(
                                        (item) =>
                                            item.width === current.width &&
                                            item.height === current.height
                                    )
                                ) {
                                    return accumulated;
                                }
                                return [...accumulated, current];
                            }, [])
                            .reverse();

                        if (this.origin === 'galleries') {
                            const grouped = this.groupBy(files, 'size');

                            tmpFiles = Object.keys(grouped).map((key) => {
                                const sumSize = grouped[key].reduce(
                                    (curr, prev) => +prev.file_size + curr,
                                    0
                                );
                                return {
                                    value: key,
                                    size: sumSize,
                                    label: labelSizeMap[key],
                                };
                            });

                            tmpFiles.push({
                                value: '',
                                size: tmpFiles.reduce(
                                    (curr, prev) => +prev.size + curr,
                                    0
                                ),
                                label: 'Todos',
                            });
                        } else {
                            if (tmpVideosIds.length) {
                                files.forEach((file) => {
                                    const fileRef = Object.entries(
                                        this.videoIds
                                    ).find(
                                        ([key, value]) => value === file.file_id
                                    );
                                    file.size = fileRef.length
                                        ? fileRef[0]
                                        : null;
                                });
                            }

                            tmpFiles = files.map((file) => ({
                                value: file.size,
                                size: file.file_size,
                                label: labelSizeMap[file.size],
                                resolution: file.width
                                    ? `${file.width} x ${file.height}`
                                    : undefined,
                            }));

                            tmpFiles.push({
                                value: '',
                                size: resp.infos.total,
                                label: 'Todos',
                            });
                        }
                        this.fileSizes = tmpFiles.filter((file) =>
                            Boolean(file.size)
                        );
                    }
                    this.isLoading = false;
                },
                (err) => {
                    this.isLoading = false;
                    console.log(err);
                }
            );
    }

    handleClick(size: string) {
        this.onSizeClicked.emit(size);
    }

    private groupBy(array, key) {
        return array.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
