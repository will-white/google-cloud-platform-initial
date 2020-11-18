import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { MapService } from "../../services/map.service";

@Component({
  selector: "gis-coordinates",
  templateUrl: "./coordinates.component.html",
  styleUrls: ["./coordinates.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordinatesComponent implements OnInit {
  constructor(public mapService: MapService) {}

  ngOnInit(): void {}
}
