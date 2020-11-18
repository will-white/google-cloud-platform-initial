import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { MapLayerType } from "./models";
import { FieldService } from "./services/field.service";
import { LayersService } from "./services/layers.service";
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
    private layerService: LayersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log("test");
    this.route.paramMap.subscribe(params => {
      console.log('hi');
      if (params.has("insuredID")) {
        console.log('eh');
        this.layerService.addInsuredLayer(+params.get("insuredID"));
      }
    });

    this.fieldService.selectedField$
      .pipe(filter(feature => feature?.feature))
      .subscribe(selectedFeature => {
        this.router
          .navigate(["ftf", selectedFeature.id], { relativeTo: this.route })
          .then(() => {
            const view = selectedFeature.feature.getGeometry();
            this.mapService.map
              .getView()
              .fit(view, { padding: [0, 60, 60, 60] });
          });
      });
  }
}
