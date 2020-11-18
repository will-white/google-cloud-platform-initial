import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { MapService } from "./map.service";
import { Feature } from "ol/Feature";
import { filter, skip } from "rxjs/operators";

type selectedFeature = {
  feature: Feature;
  id: number;
};

@Injectable({
  providedIn: "root"
})
export class FieldService {
  private selectedField = new BehaviorSubject<selectedFeature>(undefined);
  selectedField$ = this.selectedField.pipe(filter(f => f !== undefined));

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mapService: MapService
  ) {}

  fieldSelected(feature: any): void {
    const props = feature.getProperties();
    const selectedFeature = { feature, id: props.id };
    this.selectedField.next(selectedFeature);
  }

  fieldUnselected(): void {
    this.selectedField.next(null);
  }
}
