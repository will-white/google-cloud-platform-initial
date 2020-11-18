import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { MapService } from "../../services/map.service";

@Component({
  selector: "gis-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationComponent implements OnInit {
  constructor(public mapService: MapService) {}

  ngOnInit(): void {}
}
