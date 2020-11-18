import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ActivatedRoute } from "@angular/router";

const currentDate = new Date();
const minReinYear = 2018;
const maxReinYear = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 6
).getFullYear();

// https://stackoverflow.com/a/49577331
const range = (from, to, step) =>
  [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);

const avaliableYears = range(minReinYear, maxReinYear, 1).reverse();

@Injectable({
  providedIn: "root"
})
export class ReinYearService {
  private reinYear: BehaviorSubject<number> = new BehaviorSubject(
    currentDate.getFullYear()
  );
  reinYear$ = this.reinYear.asObservable();
  avaliableYears = avaliableYears;

  constructor(route: ActivatedRoute) {
    route.queryParams.subscribe(params => {
      if (this.isValidReinYear(Number(params.reinYear))) {
        this.changeSelectedReinYear(params.reinYear);
      }
    });
  }

  changeSelectedReinYear(reinYear: number): void {
    if (this.isValidReinYear(reinYear)) {
      this.reinYear.next(reinYear);
    }
  }

  private isValidReinYear(reinYear: number): boolean {
    return reinYear >= minReinYear && reinYear <= maxReinYear;
  }
}
