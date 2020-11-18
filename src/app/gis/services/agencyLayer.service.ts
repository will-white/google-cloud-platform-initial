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
import { LayersService } from "./layers.service";

const select = new Select({
    /* some logic on layer to decide if its features should be considered; return true if yes */
  layers: (layer) => true, // layer.className_ === MapLayerType.Insured,
    /* some logic on a feature and layer to decide if it should be selectable; return true if yes */
  filter: function(feature, layer) {
      return true;
  },
});

const modify = new Modify({
  features: select.getFeatures()
});

@Injectable({
  providedIn: "root"
})
export class AgencyLayerService implements OnDestroy {
  private ngUnsubscribe = new Subject();

  constructor(
    private mapService: MapService,
    private layerService: LayersService,
    private fieldService: FieldService
  ) {

  }

  addLayer(insuredID: number): void {
    const layer = this.layerService.availableLayers.find(
        l => l?.type === MapLayerType.Agency
      );
    if (layer)
      this.layerService.addLayer(layer);

    fromEvent(this.mapService.map, "pointermove")
      .pipe(
        // tap(console.log),
        filter((event: MapBrowserEvent) => !event.dragging),
        takeUntil(layer.unsubscribe),
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

    fromEvent(select, "select")
      .pipe(
        filter((s: SelectEvent) => s?.selected?.length > 0),
        takeUntil(layer.unsubscribe),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(event => {
        this.fieldService.fieldSelected(event.selected[0]);
      });

    this.mapService.map.addInteraction(select);

    fromEvent(this.mapService.map, "postrender")
      .pipe(delay(0), take(1))
      .subscribe(_ => {
        const insuredExtent = layer.olLayer.getSource().getExtent();
        this.mapService.center(insuredExtent);
      });
  }

  addModify(): void {
      this.mapService.map.addInteraction(modify);
  }

  removeModify(): void {
      this.mapService.map.removeInteraction(modify);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}