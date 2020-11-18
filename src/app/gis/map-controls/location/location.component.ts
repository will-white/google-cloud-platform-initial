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

  ngOnInit(): void {
    /** Update Zoom Level and Location after map stops moving */
    // fromEvent(this.map, "moveend")
    //   .pipe(
    //     debounceTime(300),
    //     map(_ => this.map.getView()),
    //     tap(view => this.zoomLevel.next(Math.trunc(view.getZoom()))),
    //     map(view => this.toLonLat(view.getCenter())),
    //     switchMap(coordinates =>
    //       this.http.get<CensusBlock>(fccBlock(coordinates.lat, coordinates.lon))
    //     ),
    //     takeUntil(this.ngUnsubscribe)
    //   )
    //   .subscribe(block => this.location.next(block));
  }
}
