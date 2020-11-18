import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { MapService } from "./map.service";
import { Feature } from "ol/Feature";

type selectedFeature = {
  feature: Feature;
  id: number;
};

@Injectable({
  providedIn: "root"
})
export class FieldService {
  private selectedField = new BehaviorSubject<selectedFeature>(undefined);
  selectedField$ = this.selectedField.asObservable();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mapService: MapService
  ) {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      if (params.has("ftfID")) {
        console.log(params.get("ftfID"));
        // Find field and then select it
      }
    });
  }

  fieldSelected(feature: any): void {
    const props = feature.getProperties();
    const selectedFeature = { feature, id: props.id };
    this.selectedField.next(selectedFeature);
  }

  fieldUnselected(): void {
    this.selectedField.next(undefined);
  }
}
