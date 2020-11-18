import { Location } from "@angular/common";
import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FieldService } from "../../services/field.service";
import { MapService } from "../../services/map.service";

@Component({
  selector: "app-field-editor",
  templateUrl: "./field-editor.component.html",
  styleUrls: ["./field-editor.component.css"]
})
export class FieldEditorComponent implements AfterViewInit, OnDestroy {
  activeLink = "Field";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fieldService: FieldService,
    private mapService: MapService
  ) {
    this.route.paramMap.subscribe(params => {
      if (params.has("ftfID")) {
        // this.fieldService.fieldSelected(params.get("ftfID"));
        console.log(params.get("ftfID"));
        // Find field and then select it
      }
    });
  }

  ngAfterViewInit(): void {
    this.fieldService.selectedField$.subscribe(selectedFeature => {
      if (selectedFeature) {
        const view = selectedFeature.feature.getGeometry();
        setTimeout(() => {
          this.mapService.center(view);
        }, 5);
      }
    });
  }

  back(): void {
    this.fieldService.fieldUnselected();
    this.router.navigate(["../../"], {
      relativeTo: this.route
    });
  }

  ngOnDestroy(): void {
    this.fieldService.fieldUnselected();
  }
}
