import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable, from, combineLatest } from "rxjs";
import { filter, flatMap, map, tap, mergeMap } from "rxjs/operators";
import { MapLayer, MapLayerGroup } from "../../models";
import { LayersService } from "../../services/layers.service";

@Component({
  selector: "gis-layers-selector",
  templateUrl: "./layers-selector.component.html",
  styleUrls: ["./layers-selector.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayersSelectorComponent implements OnInit {
  geolocation: Geolocation = navigator.geolocation;
  isExpanded = false;
  mapKind = MapLayerGroup;

  constructor(public layersService: LayersService) {}

  ngOnInit(): void {}

  filteredLayers(group: MapLayerGroup): Observable<MapLayer[]> {
    return this.layersService.selectedLayers$.pipe(
      map(selected =>
        this.layersService.availableLayers.filter(
          layer => !selected.includes(layer) && layer.group === group
        )
      )
    );
  }
}
