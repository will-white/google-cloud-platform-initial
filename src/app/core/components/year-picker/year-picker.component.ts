import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { ReinYearService } from "../../../shared/services/rein-year.service";

// import { YearPickerService } from './year-picker.service';

@Component({
  selector: "app-year-picker",
  templateUrl: "./year-picker.component.html",
  styleUrls: ["./year-picker.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YearPickerComponent {
  currentYear!: number;
  years!: number[];

  constructor(public yearPickerService: ReinYearService) {
    this.years = yearPickerService.avaliableYears;
  }

  changeYear(year: number): void {
    this.yearPickerService.changeSelectedReinYear(year);
  }
}
