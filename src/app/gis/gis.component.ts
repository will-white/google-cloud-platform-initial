import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, skip } from "rxjs/operators";
import { FieldService } from "./services/field.service";
import { InsuredLayerService } from "./services/insuredLayer.service";
import { MapService } from "./services/map.service";

@Component({
  selector: "app-gis",
  templateUrl: "./gis.component.html",
  styleUrls: ["./gis.component.css"]
})
export class GisComponent {
  constructor(
    public fieldService: FieldService,
    private mapService: MapService,
    private insuredLayer: InsuredLayerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.fieldService.selectedField$
      .subscribe(selectedFeature => {
        if (selectedFeature) {
          this.router.navigate(["ftf", selectedFeature.id], {
            relativeTo: this.route
          });
        }
      });
  }
}
