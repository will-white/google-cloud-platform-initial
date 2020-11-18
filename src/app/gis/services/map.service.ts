import { Injectable, NgZone, OnDestroy } from "@angular/core";
import olMap from "ol/Map";
import { BehaviorSubject, fromEvent, Subject } from "rxjs";
import View from "ol/View";
import { fromLonLat, toLonLat, transform } from "ol/proj";
import MapBrowserEvent from "ol/MapBrowserEvent";
import { Coordinate } from "ol/coordinate";
import {
  debounceTime,
  filter,
  map,
  switchMap,
  takeUntil,
  tap
} from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { CensusBlock, MapLayerType } from "../models";

import { TileArcGISRest, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { StylesService } from "./styles.service";

const fccBlock = (latitude, longitude): string =>
  `https://geo.fcc.gov/api/census/block/find?latitude=${latitude}&longitude=${longitude}&format=json`;

/**
 * https://source.opennews.org/articles/choosing-right-map-projection/
 * TODO: See if change of query works
 * TODO: Add routing via either query or route (route should work since need it for the panel too show up for editing)
 * TODO: Search feature
 * TODO: Allow adding/editing/saving
 * TODO: Add ability for preferences to change colors
 * TODO: Add call to get MetaData of line/field.
 * TODO: For Layout table: https://stackblitz.com/edit/mat-table-row-reordering
 * TODO: https://stackoverflow.com/a/49630139
 * TODO: https://github.com/openlayers/openlayers/issues/4213#issuecomment-145149625
 * TODO: Check https://stackoverflow.com/questions/53240548/how-to-update-an-xyz-layer-in-open-layers-5
 * TODO: https://stackoverflow.com/questions/49095151/how-to-add-a-http-header-to-openlayers4-requests
 * */
@Injectable({
  providedIn: "root"
})
export class MapService implements OnDestroy {
  private ngUnsubscribe = new Subject();
  private zoomLevel = new BehaviorSubject<number | undefined>(undefined);
  private coordinates = new BehaviorSubject<{ lon: string; lat: string }>({
    lon: "0",
    lat: "0"
  });
  private location = new BehaviorSubject<CensusBlock | undefined>(undefined);

  coords$ = this.coordinates.asObservable();
  zoomLevel$ = this.zoomLevel.asObservable();
  location$ = this.location.asObservable();

  map: olMap;

  constructor(
    private ngZone: NgZone,
    private http: HttpClient,
    private styleService: StylesService
  ) {
    this.createMap();

    /** Update Zoom Level and Location after map stops moving */
    fromEvent(this.map, "moveend")
      .pipe(
        debounceTime(300),
        map(_ => this.map.getView()),
        tap(view => this.zoomLevel.next(Math.trunc(view.getZoom()))),
        map(view => this.toLonLat(view.getCenter())),
        switchMap(coordinates =>
          this.http.get<CensusBlock>(fccBlock(coordinates.lat, coordinates.lon))
        ),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(block => this.location.next(block));

    /** Update coordinates based on where mouse cursor is */
    fromEvent(this.map, "pointermove")
      .pipe(
        filter((event: MapBrowserEvent) => !event.dragging),
        map(event => this.toLonLat(event.coordinate)),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(coords => this.coordinates.next(coords));
  }

  attach(elementID = "map"): void {
    setTimeout(() => {
      this.map.setTarget(elementID);
      this.map.updateSize();
    }, 0);
  }

  unattach(): void {
    this.map.setTarget(null);
  }

  center(extent: any): void {
    this.map.getView().fit(extent, { padding: [0, 60, 60, 60] });
  }

  /**
   * Sets the view to the accordant zoom and center.
   * @param zoom Zoom.
   * @param center Center in long/lat.
   */
  setView(zoom: number, center: [number, number]): void {
    this.map.getView().setZoom(10);
    this.map.getView().setCenter(fromLonLat(center));
  }

  zoomIn = () => this.changeZoomLevel(1);
  zoomOut = () => this.changeZoomLevel(-1);
  changeZoomLevel(zoomLevel: number): void {
    const view = this.map.getView();
    const zoom = view.getZoom() + zoomLevel;
    view.animate({
      zoom,
      duration: 300
    });
  }

  geoLocate(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setView(10, [position.coords.longitude, position.coords.latitude]);
      });
    }
  }

  private toLonLat(coordinates: Coordinate): { lon: string; lat: string } {
    const lonLat = toLonLat(coordinates);
    return { lon: lonLat[0].toFixed(4), lat: lonLat[1].toFixed(4) };
  }

  private createMap() {
    // const startingCoords = [-95.67, 29.99]; // Houston
    // const startingCoords = [-101.8552, 33.5779]; // Lubbock
    const startingCoords = [-98.35, 39.5]; // Center of USA

    this.map = new olMap({
      layers: [
        new TileLayer({
          preload: Infinity,
          source: new TileArcGISRest({
            url:
              "https://services.nationalmap.gov/arcgis/rest/services/USGSNAIPImagery/ImageServer"
          })
        })
      ],
      view: new View({
        center: fromLonLat(startingCoords),
        zoom: 4,
        constrainResolution: true // Only allows for whole number zoom levels
      }),
      controls: []
    });

    this.coordinates.next(this.toLonLat(this.map.getView().getCenter()));
  }

  ngOnDestroy(): void {
    this.map.setTarget(null);
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
