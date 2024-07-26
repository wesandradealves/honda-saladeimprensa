import {
    Component,
    ViewChild,
    Injectable,
    Input,
    Output,
    EventEmitter,
    SimpleChanges,
    ElementRef,
} from '@angular/core';
import {
    NgbDatepicker,
    NgbDatepickerI18n,
    NgbDate,
    NgbCalendar,
    NgbDateAdapter,
    NgbDateParserFormatter,
    NgbDateStruct,
    NgbInputDatepickerConfig,
} from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
    'pt-Br': {
        weekdays: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        months: [
            'Janeiro',
            'Feveiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
        ],
        weekLabel: 'Sem',
    },
};

@Injectable()
export class I18n {
    language = 'pt-Br';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {
    getWeekdayShortName(weekday: number): string {
        throw new Error('Method not implemented.');
    }
    constructor(private _i18n: I18n) {
        super();
    }
    getWeekdayLabel(weekday: number): string {
        return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
    }
    getWeekLabel(): string {
        return I18N_VALUES[this._i18n.language].weekLabel;
    }
    getMonthShortName(month: number): string {
        return I18N_VALUES[this._i18n.language].months[month - 1];
    }
    getMonthFullName(month: number): string {
        return this.getMonthShortName(month);
    }
    getDayAriaLabel(date: NgbDateStruct): string {
        return `${date.day}-${date.month}-${date.year}`;
    }
}

@Component({
    selector: 'datepicker-input',
    templateUrl: './datepicker-input.component.html',
    styleUrls: ['./datepicker-input.component.scss'],
    providers: [
        I18n,
        { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    ],
    host: {
        '(document:click)': 'onClick($event)',
    }
})
export class DatepickerInputComponent {
    show: boolean = false;
    dateToInput: string;
    weekdays;

    @Input() date;
    @Output() onChange = new EventEmitter<string>();

    @ViewChild(NgbDatepicker, { static: true }) datepicker: NgbDatepicker;

    constructor(
        private ngbCalendar: NgbCalendar,
        private dateAdapter: NgbDateAdapter<string>,
        public formatter: NgbDateParserFormatter,
        public i18n: NgbDatepickerI18n,
        config: NgbInputDatepickerConfig,
        private _eref: ElementRef
    ) {
        this.weekdays = I18N_VALUES['pt-Br'].weekdays;
        config.placement = ['bottom-left'];
    }

    ngOnChanges(changes: SimpleChanges) {
        const currentDate = changes.date.currentValue;
        if (
            currentDate &&
            !currentDate.day &&
            !currentDate.month &&
            !currentDate.year
        ) {
            this.dateToInput = null;
        } else {
            this.dateToInput = this.toModel(currentDate);
        }
    }

    navigate(number: number) {
        const { state, calendar } = this.datepicker;
        this.date = calendar.getNext(
            this.date ? this.date : state.firstDate,
            'm',
            number
        );
        this.dateToInput = this.toModel(this.date)!;
        this.datepicker.navigateTo(this.date);
        this.onChange.emit(this.date);
    }

    navigateYear(number: number) {
        const { state, calendar } = this.datepicker;
        this.date = calendar.getNext(
            this.date ? this.date : state.firstDate,
            'y',
            number
        );
        this.dateToInput = this.toModel(this.date)!;
        this.datepicker.navigateTo(this.date);
        this.onChange.emit(this.date);
    }

    isDisabled = (date: NgbDate, current: { month: number; year: number }) =>
        date.month !== current.month;

    toggle() {
        this.show = !this.show;
    }

    onClick(event) {
      if (!this._eref.nativeElement.contains(event.target)) {
          this.show = false;
      }
    }

    toModel(date: NgbDateStruct | null): string | null {
        return date
            ? (date.day < 10 ? '0' : '') +
                  date.day +
                  (date.month < 10 ? '0' : '') +
                  date.month +
                  date.year
            : null;
    }

    fromModel(value: string | null): NgbDateStruct | null {
        if (value) {
            return {
                day: parseInt(value.substring(0, 2), 10),
                month: parseInt(value.substring(3, 4), 10),
                year: parseInt(value.substring(4, 8), 10),
            };
        }
        return null;
    }

    onDateSelection(date: NgbDate) {
        this.toggle();
        this.dateToInput = this.toModel(date)!;
        this.onChange.emit(this.date);
    }

    onInputDate() {
        this.date = this.fromModel(this.dateToInput);
        if (this.date.day && this.date.month && this.date.year) {
            this.datepicker.navigateTo(this.date);
            this.onChange.emit(this.date);
        }
    }
}
