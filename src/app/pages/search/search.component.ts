import { Component, OnInit } from '@angular/core';
import { SearchItem } from 'src/app/models/search';
import { SearchService } from 'src/app/services/search.service';
import { environment } from '../../../environments/environment';

interface CheckboxItem {
    name: string;
    label: string;
    checked: boolean;
    value: any;
}
interface Period {
    from: string;
    to: string;
}
@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    isLoading: boolean = false;
    url: string = environment.src_url;
    term: string = '';
    items: SearchItem[] = [];
    total_pages: number = 0;
    currentPage: number = 0;
    itemsPerPage: number = 8;
    pageSize: number = 0;
    pageNumber: number = 0;
    totalItems: number = 0;
    selectedGallery: string;
    categories: CheckboxItem[] = [
        {
            name: 'corporativo',
            label: 'Corporativo',
            value: 14,
            checked: false,
        },
        {
            name: 'motocicletas',
            label: 'Motocicletas',
            value: 12,
            checked: false,
        },
        { name: 'automoveis', label: 'Automóveis', value: 11, checked: false },
        {
            name: 'produtos_de_forca',
            label: 'Motores e Máquinas',
            value: 13,
            checked: false,
        },
    ];
    types: CheckboxItem[] = [
        {
            name: 'releases',
            label: 'Releases',
            value: 'releases',
            checked: false,
        },
        { name: 'fotos', label: 'Fotos', value: 'fotos', checked: false },
        { name: 'videos', label: 'Vídeos', value: 'videos', checked: false },
        {
            name: 'press_kit',
            label: 'Press Kit',
            value: 'press_kit',
            checked: false,
        },
    ];
    modalFiltersShow: boolean = false;
    fromDate: any;
    toDate: any;
    filterDate: Period = {
        from: '',
        to: '',
    };
    storageFiltersKey = 'search-filters';

    constructor(
        private searchService: SearchService,
    ) {
        this.term = this.searchService.term;
    }

    ngOnInit() {
        this.onFilter();
    }

    search(e) {
        if(e.target.value != '') {
            this.term = e.target.value ? e.target.value : '';
            this.pageNumber = 0;
            this.currentPage = 1;
            this.onFilter();
        } else {
            this.resetTerm();
            this.term = '';
        }
    }

    resetTerm() {
        this.term = '';
        this.pageNumber = 0;
        this.currentPage = 1;
        this.onFilter();

    }

    resetFilters() {
        this.categories.forEach((cat) => (cat.checked = false));
        this.types.forEach((type) => (type.checked = false));
        this.filterDate = {
            from: '',
            to: '',
        };
        this.fromDate = {
            year: '',
            month: '',
            day: '',
        };
        this.toDate = {
            year: '',
            month: '',
            day: '',
        };
        this.onFilter();
    }

    loadModalGallery(id: any) {
        this.selectedGallery = id;
    }

    onPageChange(pageNum: number): void {
        this.pageNumber = pageNum - 1;
        this.onFilter();
    }

    changePagesize(num: number): void {
        this.itemsPerPage = this.pageSize + num;
    }

    onChangeCategory(e) {
        const { checked, value } = e.target;
        this.categories.forEach((cat) => {
            if (cat.value == value) {
                cat.checked = checked;
            } else if (checked) {
                cat.checked = false;
            }
        });
    }

    onChangeType(e) {
        const { checked, value } = e.target;
        this.types.forEach((type) => {
            if (type.value == value) {
                type.checked = checked;
            }
        });
    }

    onFilter() {
        this.searchService.term = '';
        let filterTypes = '';

        let selectedTypes = this.types
            .filter((type) => type.checked)
            .map((type) => type.value);

        selectedTypes?.forEach((type: any) => {
            if (type === 'releases') {
                filterTypes += `&type[]=releases`;
            }
            if (type === 'fotos') {
                filterTypes += `&type[]=galeria_de_imagens&type[]=releases_image`;
            }
            if (type === 'videos') {
                filterTypes += `&type[]=galeria_de_videos&type[]=releases_video`;
            }
            if (type === 'press_kit') {
                filterTypes += `&presskit=1`;

                if (!this.term) {
                    filterTypes += '&type[]=releases';
                }
            }
        });

        const selectedCategories = this.categories
            .filter((cat) => cat.checked)
            .map((cat) => cat.value);
        const filterCategories = selectedCategories.join('+');

        this.isLoading = true;
        this.searchService
        .getSearch(
            this.term,
            this.pageNumber,
            filterCategories,
            filterTypes,
            this.filterDate
        )
        .subscribe((data: any) => {
            this.items = data?.rows;
            this.totalItems = data?.pager?.total_items;
            this.total_pages = data?.pager?.total_pages;
            this.itemsPerPage = data?.pager?.items_per_page;
            this.isLoading = false;
        });
    }

    openModalFilters() {
        this.modalFiltersShow = true;
    }

    onCloseModalFilters() {
        this.modalFiltersShow = false;
    }

    onChangeFromDate(e) {
        this.fromDate = e;
        this.filterDate.from = this.formatDate(e);
    }

    onChangeToDate(e) {
        this.toDate = e;
        this.filterDate.to = this.formatDate(e);
    }

    stringToDate(dateStr) {
        const [year, month, day] = dateStr?.split('-');
        return { year, month, day };
    }

    formatDate(e) {
        return (
            e.year +
            '-' +
            (e.month < 10 ? '0' : '') +
            e.month +
            '-' +
            (e.day < 10 ? '0' : '') +
            e.day
        );
    }
}
