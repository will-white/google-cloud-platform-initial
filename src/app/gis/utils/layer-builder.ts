import { MapLayerType, QueryableParams, MapLayer } from "../models";
import BaseLayer from "ol/layer/Base";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { combineLatest, Subscription, Observable, Subject } from "rxjs";
import GeoJSON from "ol/format/GeoJSON";
import SourceOsm from "ol/source/OSM";
import SourceTileArcGISRest from "ol/source/TileArcGISRest";
import { takeUntil, tap } from "rxjs/operators";
import { insured } from "../services/insured";
import { layout } from "../services/layout";

export class MapLayerBuilder {
  constructor(
    private reinYear$: Observable<number>,
    private insuredID$: Observable<number>,
    private agencyID$: Observable<number>,
    private highRiskMapAreas$: Observable<number[]>,
    private tYieldMapAreas$: Observable<number[]>
  ) {}

  build(layer: MapLayer): void {
    layer.olLayer = buildBaseLayer(layer.type, layer.className, layer.url);

    this.buildLayerQueries(layer.type, layer.unsubscribe, layer.olLayer);
  }

  private buildLayerQueries(
    type: MapLayerType,
    mapSubscription: Subject<unknown>,
    baseLayer: BaseLayer
  ): void {
    switch (type) {
      case MapLayerType.CLU:
      case MapLayerType.UsgsSoils:
      case MapLayerType.BreachedLevees:
        this.reinYear$.pipe(takeUntil(mapSubscription)).subscribe(year => {
          updateQuery(baseLayer, type, {
            reinYear: year
          });
        });

      case MapLayerType.HighRisk:
        combineLatest([this.reinYear$, this.highRiskMapAreas$])
          .pipe(
            tap(console.log),
            takeUntil(mapSubscription)
          )
          .subscribe(([reinYear, mapAreas]) => {
            updateQuery(baseLayer, type, {
              reinYear,
              mapAreas
            });
          });

      case MapLayerType.TYield:
        combineLatest([this.reinYear$, this.tYieldMapAreas$])
          .pipe(takeUntil(mapSubscription))
          .subscribe(([reinYear, mapAreas]) => {
            updateQuery(baseLayer, type, {
              reinYear,
              mapAreas
            });
          });

      case MapLayerType.Insured:
        combineLatest([this.reinYear$, this.insuredID$])
          .pipe(takeUntil(mapSubscription))
          .subscribe(([reinYear, insuredID]) => {
            updateQuery(baseLayer, type, {
              reinYear,
              insuredID
            });
          });

      case MapLayerType.Agency:
        combineLatest([this.reinYear$, this.agencyID$])
          .pipe(takeUntil(mapSubscription))
          .subscribe(([reinYear, agencyID]) => {
            updateQuery(baseLayer, type, {
              reinYear,
              agencyID
            });
          });
    }
  }
}

const XyzTileLayerBuilder = (
  url: string | undefined,
  className: string,
  type: MapLayerType
): TileLayer => {
  if (!url) {
    url = XyzUrl(type);
    if (!url) {
      console.error(`${name} is missing a url!`);
    }
  }

  return new TileLayer({
    className,
    source: new XYZ({
      url,
      wrapX: true
    }),
    preload: Infinity,
    visible: true
  });
};

const buildBaseLayer = (
  type: MapLayerType,
  className: string,
  url?: string
): BaseLayer => {
  switch (type) {
    case MapLayerType.BaseImagery:
      return new TileLayer({
        className,
        source: new SourceTileArcGISRest({
          url:
            // 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer',
            "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
          // 'https://naip.arcgis.com/arcgis/rest/services/NAIP/ImageServer',
          wrapX: true
        })
      });

    case MapLayerType.RMAImagery:
      return new TileLayer({
        preload: Infinity,
        source: new SourceTileArcGISRest({
          url:
            "https://services.nationalmap.gov/arcgis/rest/services/USGSNAIPImagery/ImageServer"
        })
      });

    case MapLayerType.Insured:
      return new VectorLayer({
        className,
        source: new VectorSource({
          features: new GeoJSON().readFeatures(insured)
        }),
        zIndex: 100
      });

    case MapLayerType.Layout:
      return new VectorLayer({
        className,
        source: new VectorSource({
          features: new GeoJSON().readFeatures(layout)
        }),
        zIndex: 99
      });

    case MapLayerType.USBoundaries:
    case MapLayerType.ColumbiaBasin:
    case MapLayerType.RainfallIndex:
    case MapLayerType.TexasAbstracts:
    case MapLayerType.Streets:
    case MapLayerType.PLSS:
    case MapLayerType.CLU:
    case MapLayerType.UsgsSoils:
    case MapLayerType.BreachedLevees:
    case MapLayerType.HighRisk:
    case MapLayerType.TYield:
    case MapLayerType.Agency:
      return XyzTileLayerBuilder(url, className, type);

    case MapLayerType.TexasCityInfo:
      return new VectorLayer({
        className,
        source: new VectorSource({
          format: new GeoJSON(),
          url:
            "https://opendata.arcgis.com/datasets/09cd5b6811c54857bd3856b5549e34f0_0.geojson"
        })
      });

    case MapLayerType.OSM:
      return new TileLayer({
        className,
        source: new SourceOsm()
      });

    default:
      throw new Error(`Layer Type: ${type}, isn't supported.`);
  }
};

const updateQuery = (
  layer: BaseLayer,
  type: MapLayerType,
  params: QueryableParams
): void => {
  console.log("Updating query");
  /** This is the only way to reliably get open layers to hard "update" tiles with a new url */
  if (layer instanceof TileLayer) {
    const source = layer.getSource();
    if (source instanceof XYZ) {
      source.setUrl(XyzUrl(type, params));
    }
  } else if (layer instanceof VectorLayer) {
    const source = layer.getSource();
  }
};

const XyzUrl = (type: MapLayerType, params?: QueryableParams): string => {
  const layerName = type.toString().toLowerCase();
  return params ? QuerableXyzUrl(layerName, params) : BaseXyzUrl(layerName);
};

const BaseXyzUrl = (layerName: string): string =>
  `https://{a-c}.tile.URLGOESHERE.com/${layerName}/{z}/{x}/{y}.png`;

const QuerableXyzUrl = (layer: string, params: QueryableParams) => {
  const queryString = Object.entries(params)
    .map(
      ([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
    )
    .join("&");

  return `${BaseXyzUrl(layer)}?${queryString}`;
};
