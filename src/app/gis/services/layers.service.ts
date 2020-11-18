import { Injectable, OnDestroy } from "@angular/core";
import { MapService } from "./map.service";
import { EMPTY, BehaviorSubject, Subject, fromEvent } from "rxjs";
import { MapLayer, MapLayerGroup, MapLayerType } from "../models";
import { MapLayerBuilder } from "../utils/layer-builder";
import { ReinYearService } from "../../shared/services/rein-year.service";
import { StylesService } from "./styles.service";
import { AccountService } from "../../shared/services/account.service";
import { delay, filter, map,  take,    takeUntil,    tap } from "rxjs/operators";
import {
  Modify,
  Select,
  SelectEvent,
  defaults as defaultInteractions,
} from "ol/interaction";
import MapBrowserEvent from "ol/MapBrowserEvent";
import { ActivatedRoute } from "@angular/router";
import { FieldService } from "./field.service";
import { Feature } from 'ol/Feature';

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

const insuredSelect = new Select({
    /* some logic on layer to decide if its features should be considered; return true if yes */
  layers: (layer) => true, // layer.className_ === MapLayerType.Insured,
    /* some logic on a feature and layer to decide if it should be selectable; return true if yes */
  filter: function(feature, layer) {
      return true;
  },
});

const modify = new Modify({
  features: insuredSelect.getFeatures()
});

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
    private route: ActivatedRoute,
    private userService: AccountService,
    private mapService: MapService,
    private styleService: StylesService,
    reinYearService: ReinYearService,
    private fieldService: FieldService
  ) {
    // TODO: Add fake to preferences/user settings service to get selected
    // TODO: Add call to same service to update current layers
    this.mapLayerBuilder = new MapLayerBuilder(
      reinYearService.reinYear$,
      EMPTY,
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

  addInsuredLayer(insuredID: number): void {
    const insuredLayer = this.availableLayers.find(
        l => l?.type === MapLayerType.Insured
      );
    if (insuredLayer)
      this.addLayer(insuredLayer);

    fromEvent(this.mapService.map, "pointermove")
      .pipe(
        // tap(console.log),
        filter((event: MapBrowserEvent) => !event.dragging),
        takeUntil(insuredLayer.unsubscribe),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(event => 
        this.mapService.map.getTargetElement().style.cursor = this.mapService.map.hasFeatureAtPixel(
            event.pixel,
            // {
            //   layerFilter: (layer) => layer.className_ === MapLayerType.Insured
            // }
          )
            ? "pointer"
            : "");

    fromEvent(insuredSelect, "select")
      .pipe(
        filter((s: SelectEvent) => s?.selected?.length > 0),
        takeUntil(insuredLayer.unsubscribe),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(event => {
        console.log("test");
        this.fieldService.fieldSelected(event.selected[0]);
      });

    this.mapService.map.addInteraction(insuredSelect);

    fromEvent(this.mapService.map, "postrender")
      .pipe(delay(0), take(1))
      .subscribe(_ => {
        const insuredExtent = insuredLayer.olLayer.getSource().getExtent();
        this.mapService.center(insuredExtent);
      });
  }

  addModifyToInsuredLayer(): void {
      this.mapService.map.addInteraction(modify);
  }

  removeModifyToInsuredLayer(): void {
      this.mapService.map.removeInteraction(modify);
  }

  addAgencyLayer(): void {

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
