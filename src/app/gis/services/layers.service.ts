import { Injectable, OnDestroy } from "@angular/core";
import { MapService } from "./map.service";
import { EMPTY, BehaviorSubject, Subject, interval } from "rxjs";
import { MapLayer, MapLayerGroup, MapLayerType } from "../models";
import { MapLayerBuilder } from "../utils/layer-builder";
import { ReinYearService } from "../../shared/services/rein-year.service";
import { StylesService } from "./styles.service";
import { AccountService } from "../../shared/services/account.service";
import { ActivatedRoute } from "@angular/router";
import { FieldService } from "./field.service";

// https://viewer.nationalmap.gov/services/
const AvailableLayers: MapLayer[] = [
  new MapLayer(
    MapLayerGroup.Agri,
    MapLayerType.HighRisk,
    "High Risk Map Areas"
  ),
  new MapLayer(
    MapLayerGroup.Agri,
    MapLayerType.BreachedLevees,
    "Breached Levee Maps"
  ),
  new MapLayer(
    MapLayerGroup.Base,
    MapLayerType.ColumbiaBasin,
    "Columbia Basin"
  ),
  new MapLayer(
    MapLayerGroup.Agri,
    MapLayerType.RainfallIndex,
    "Rainfall Index Grid"
  ),
  new MapLayer(MapLayerGroup.Agri, MapLayerType.TYield, "T-Yield Map Areas"),
  new MapLayer(MapLayerGroup.Agri, MapLayerType.UsgsSoils, "USGS Soils"),
  new MapLayer(MapLayerGroup.Agency, MapLayerType.Agency, "Agency Layer"),
  new MapLayer(MapLayerGroup.Base, MapLayerType.RMAImagery, "RMA Imagery"),
  new MapLayer(MapLayerGroup.Base, MapLayerType.BaseImagery, "Base Imagery"),
  new MapLayer(MapLayerGroup.Base, MapLayerType.USBoundaries, "US Boundaries"),
  new MapLayer(MapLayerGroup.Agri, MapLayerType.CLU, "Common Land Units"),
  new MapLayer(
    MapLayerGroup.Base,
    MapLayerType.TexasAbstracts,
    "Texas Abstracts"
  ),
  new MapLayer(MapLayerGroup.Base, MapLayerType.PLSS, "PLSS"),
  new MapLayer(MapLayerGroup.Base, MapLayerType.Streets, "Street Map"),
  new MapLayer(MapLayerGroup.Insured, MapLayerType.Insured, "Insured")
];

@Injectable({
  providedIn: "root"
})
export class LayersService implements OnDestroy {
  private ngUnsubscribe = new Subject();
  private mapLayerBuilder: MapLayerBuilder;
  private selectedLayers = new BehaviorSubject<MapLayer[]>([]);

  availableLayers = AvailableLayers;
  selectedLayers$ = this.selectedLayers.asObservable();

  constructor(
    private userService: AccountService,
    private mapService: MapService,
    private styleService: StylesService,
    reinYearService: ReinYearService,
  ) {
    // TODO: Add fake to preferences/user settings service to get selected
    // TODO: Add call to same service to update current layers
    this.mapLayerBuilder = new MapLayerBuilder(
      reinYearService.reinYear$,
      userService.insured$,
      userService.agency$,
      EMPTY,
      EMPTY
    );
  }

  addLayer(layer: MapLayer): void {
    this.mapLayerBuilder.build(layer);

    if (!layer.olLayer) {
      throw new Error("Failed to add layer to map.");
    }

    this.mapService.map.addLayer(layer.olLayer);
    this.selectedLayers.getValue().push(layer);
  }

  removeLayer(layer: MapLayer): void {
    if (!layer.olLayer) {
      throw new Error("Failed to remove layer from map.");
    }

    layer.olLayer.setVisible(false);
    this.mapService.map.removeLayer(layer.olLayer);
    this.selectedLayers.next(
      this.selectedLayers.value.filter(l => l.name !== layer.name)
    );
    layer.dispose();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    if (this.selectedLayers.value.length > 0) {
      this.selectedLayers.value.forEach(layer => {
        if (layer.olLayer) {
          this.mapService.map.removeLayer(layer.olLayer);
        }
        layer.dispose();
      });
    }
  }
}
