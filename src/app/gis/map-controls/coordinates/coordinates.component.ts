import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterContentInit
} from "@angular/core";
import { MapService } from "../../services/map.service";

@Component({
  selector: "gis-coordinates",
  templateUrl: "./coordinates.component.html",
  styleUrls: ["./coordinates.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoordinatesComponent implements AfterContentInit {
  constructor(public mapService: MapService) {}

  ngAfterContentInit(): void {
    /** Update coordinates based on where mouse cursor is */
    // fromEvent(this.map, "pointermove")
    //   .pipe(
    //     filter((event: MapBrowserEvent) => !event.dragging),
    //     map(event => this.toLonLat(event.coordinate)),
    //     takeUntil(this.ngUnsubscribe)
    //   )
    //   .subscribe(coords => this.coordinates.next(coords));
  }
}
