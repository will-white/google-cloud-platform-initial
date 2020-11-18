import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { MapService } from "../../services/map.service";

@Component({
  selector: "gis-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements AfterViewInit, OnDestroy {
  constructor(private map: MapService) {}

  ngAfterViewInit() {
    this.map.attach();
  }

  ngOnDestroy(): void {
    this.map.unattach();
  }
}
