// react
import React, {useState, useEffect, useRef} from 'react';

// openlayers
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import {transform} from 'ol/proj'
import {toStringXY} from 'ol/coordinate';
import {Feature} from "ol";
import {Point} from "ol/geom";
import s from './Map.module.scss'
import {Fill, Stroke, Style, Text} from "ol/style";
import CircleStyle from "ol/style/Circle";
import {Cluster, OSM} from "ol/source";
import {boundingExtent} from "ol/extent";

function MapWrapper() {

    // set intial state
    const [map, setMap] = useState()
    const [featuresLayer, setFeaturesLayer] = useState()
    const [selectedCoord, setSelectedCoord] = useState()
    const [features, setFeatures] = useState([])
    const [clusters, setClusters] = useState(null)

    // pull refs
    const mapElement = useRef<HTMLDivElement>(null)

    // create state ref that can be accessed in OpenLayers onclick callback function
    //  https://stackoverflow.com/a/60643670
    const mapRef = useRef()
    mapRef.current = map

    // initialize map on first render - logic formerly put into componentDidMount
    useEffect(() => {

        const count = 20;
        const features = new Array(count);
        const e = 4500000;
        for (let i = 0; i < count; ++i) {
            const coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
            features[i] = new Feature(new Point(coordinates));
        }
        //@ts-ignore
        setFeatures(features)
        // create and add vector source layer
        const initalFeaturesLayer = new VectorLayer({
            source: new VectorSource({
                features: features,
            })
        })

        const clusterSource = new Cluster({
            distance: parseInt('1', 10),
            minDistance: parseInt('1', 10),
            source: new VectorSource({
                features: features,
            })
        });

        const styleCache = {};
        const clusters = new VectorLayer({
            source: clusterSource,
            style: function (feature) {
                const size = feature.get('features').length;
                //@ts-ignore
                let style = styleCache[size];
                if (!style) {
                    style = new Style({
                        image: new CircleStyle({
                            radius: 10,
                            stroke: new Stroke({
                                color: '#fff',
                            }),
                            fill: new Fill({
                                color: '#3399CC',
                            }),
                        }),
                        text: new Text({
                            text: size.toString(),
                            fill: new Fill({
                                color: '#fff',
                            }),
                        }),
                    });
                    //@ts-ignore
                    styleCache[size] = style;
                }
                return style;
            },
        });
        //@ts-ignore
        setClusters(clusters)
        const raster = new TileLayer({
            source: new OSM(),
        });

        // create map
        const initialMap = new Map({
            //@ts-ignore
            target: mapElement.current,
            layers: [

                // USGS Topo
                /* new TileLayer({
                     source: new XYZ({
                         url: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}',
                     })
                 }),*/

                // Google Maps Terrain
                new TileLayer({
                    source: new XYZ({
                        url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
                    })
                }),

                raster,
                clusters
            ],
            view: new View({
                //projection: 'EPSG:3857',
                center: [0, 0],
                zoom: 2
            }),
            controls: []
        })

        // set map onclick handler
        initialMap.on('click', handleMapClick)

        // save map and vector layer references to state
        //@ts-ignore
        setMap(initialMap)
        //@ts-ignore
        setFeaturesLayer(initalFeaturesLayer)

    }, [])

    // update map if features prop changes - logic formerly put into componentDidUpdate
    useEffect(() => {
        if (features.length) { // may be null on first render
            //@ts-ignore
            // set features to map
            featuresLayer.setSource(
                new VectorSource({
                    features: features // make sure features is an array
                })
            )
            //@ts-ignore
            console.log(featuresLayer.getSource().getExtent())
            //@ts-ignore
            // fit map to feature extent (with 100px of padding)
            map.getView().fit(featuresLayer.getSource().getExtent(), {
                padding: [10, 10, 10, 10]
            })
        }

    }, [features, selectedCoord])

    // map click handler

    //@ts-ignore
    const handleMapClick = (event) => {

        // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
        //  https://stackoverflow.com/a/60643670
        //@ts-ignore
        const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

        // transform coord to EPSG 4326 standard Lat Long
        const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')

        // set React state
        //@ts-ignore
        setSelectedCoord(clickedCoord)

        /*clusters.getFeatures(e.pixel).then((clickedFeatures) => {
            if (clickedFeatures.length) {
                // Get clustered Coordinates
                const features = clickedFeatures[0].get('features');
                if (features.length > 1) {
                    const extent = boundingExtent(
                        features.map((r: { getGeometry: () => { (): any; new(): any; getCoordinates: { (): any; new(): any; }; }; }) => r.getGeometry().getCoordinates())
                    );
                    //@ts-ignore
                    mapRef.current.getView().fit(extent, {duration: 1000, padding: [50, 50, 50, 50]});
                }
            }
        });*/
    }

    // render component
    return (
        <div className={s.map}>

            <div ref={mapElement} className={s.map}></div>

            <div className="clicked-coord-label">
                <p>{(selectedCoord) ? toStringXY(selectedCoord, 5) : ''}</p>
            </div>

        </div>
    )

}

export default MapWrapper