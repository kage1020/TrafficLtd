import { Dispatch, Fragment, ReactNode, SetStateAction, useEffect, useState } from 'react'

import L from 'leaflet'
import {
  FeatureGroup,
  LayersControl,
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvent,
  useMapEvents,
} from 'react-leaflet'

import useAirport from '@libs/hooks/useAirport'
import useEdge from '@libs/hooks/useEdge'
import useSystem from '@libs/hooks/useSystem'
import { sleep } from '@libs/tools'

import type { LatLngTuple } from 'leaflet'

import 'leaflet-markers-canvas'
import 'leaflet.motion/dist/leaflet.motion'
import 'leaflet.animatedmarker/src/AnimatedMarker'

L.Icon.Default.imagePath = ''
L.Icon.Default.mergeOptions({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
})

type CapacityColorType = 'red' | 'green' | 'yellow'

const AirportIcon = (color: CapacityColorType = 'green') => {
  return new L.Icon({
    iconUrl: `/images/airport-${color}.svg`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
    tooltipAnchor: [0, -24],
    shadowSize: [24, 24],
  })
}

const StationIcon = new L.Icon({
  iconUrl: '/images/train.svg',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
  tooltipAnchor: [6, -12],
  shadowSize: [24, 24],
})

const PortIcon = new L.Icon({
  iconUrl: '/images/port.svg',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
  tooltipAnchor: [0, -24],
  shadowSize: [24, 24],
})

const BusIcon = new L.Icon({
  iconUrl: '/images/bus.svg',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
  tooltipAnchor: [0, -24],
  shadowSize: [24, 24],
})

const MapLayer = () => {
  return (
    <div>
      <MapContainer
        center={[35.68142790469971, 139.76706578914462]}
        zoom={5}
        maxZoom={14}
        minZoom={5}
      >
        <Map />
      </MapContainer>
    </div>
  )
}

const Map = () => {
  const { setPoint } = useSystem()
  const { data: airport } = useAirport()
  const map = useMapEvents({
    click: (e) => {
      L.DomEvent.stopPropagation(e)
      setPoint(null)
    },
  })

  return (
    <>
      <LayersControl position='topleft'>
        <LayersControl.BaseLayer checked name='pale'>
          <TileLayer
            attribution='<a href="http://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理地理院</a>'
            url='https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name='blank'>
          <TileLayer
            attribution='<a href="http://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理地理院</a>'
            url='https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name='MTB'>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; USGS'
            url='http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name='dark'>
          <TileLayer
            attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={`https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${process.env.NEXT_PUBLIC_JAWG_ACCESS_TOKEN}`}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name='light'>
          <TileLayer
            attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={`https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=${process.env.NEXT_PUBLIC_JAWG_ACCESS_TOKEN}`}
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      <FeatureGroup>
        {airport &&
          Object.entries(airport)
            .filter((p) => p[1].show)
            .map((v, i) => (
              <Marker
                key={i}
                icon={AirportIcon(
                  v[1].customers.length > 50
                    ? 'red'
                    : v[1].customers.length > 25
                    ? 'yellow'
                    : 'green',
                )}
                position={v[1].coordinates.slice().reverse() as LatLngTuple}
                eventHandlers={{
                  click: (e) => {
                    setPoint(v[0])
                  },
                }}
              >
                <Tooltip>{v[1].name}</Tooltip>
              </Marker>
            ))}
      </FeatureGroup>
      <EventLayer />
      {/* <MarkerLayer /> */}
      <EdgeLayer />
    </>
  )
}

const EventLayer = () => {
  return null
}

const MarkerLayer = () => {
  const map = useMap()
  const [first, setFirst] = useState(true)
  const [airportLayer] = useState(new L.MarkersCanvas())
  const { setPoint } = useSystem()
  const { data: airport } = useAirport()

  useEffect(() => {
    const airports = Object.entries(airport ?? {})
      .filter((p) => p[1].show)
      .map((value) =>
        L.marker(value[1].coordinates.slice().reverse() as LatLngTuple, {
          icon: AirportIcon('red'),
        })
          .bindTooltip(value[1].name)
          .on('click', (e) => {
            console.log(e, value[1].name)
            setPoint(value[0])
          }),
      )
    if (first) {
      airportLayer.addTo(map)
      setFirst(false)
    } else {
      airportLayer.clear()
    }
    airportLayer.addMarkers(airports)
  }, [airport, airportLayer, first, map, setPoint])
  return null
}

const EdgeLayer = () => {
  // const map = useMap()
  // const [first, setFirst] = useState(true)
  const { data: edge } = useEdge()
  const { data: airport } = useAirport()

  // useEffect(() => {
  // if (first) {
  //   const line = L.polyline([
  //     [40, 135],
  //     [40, 140],
  //   ])
  //   const animatedMarker = L.animatedMarker(line.getLatLngs(), {
  //     icon: AirportIcon('green'),
  //     onEnd: function () {
  //       this.animate()
  //     },
  //   })
  //   map.addLayer(animatedMarker)
  // const line = L.motion
  //   .seq([
  //     L.motion
  //       .polyline(
  //         [
  //           { lat: 40, lng: 135 },
  //           { lat: 40, lng: 140 },
  //         ],
  //         { icon: AirportIcon('green'), showMarker: true },
  //       )
  //       .motionDuration(2000),
  //   ])
  //   .addTo(map)
  // line.motionStart()
  //     setFirst(false)
  //   }
  // }, [first, map])

  return (
    <FeatureGroup>
      {airport &&
        Object.values(edge ?? {}).map((v, i) => (
          <Fragment key={i}>
            <Polyline
              positions={[
                airport[v.start].coordinates.slice().reverse() as LatLngTuple,
                airport[v.end].coordinates.slice().reverse() as LatLngTuple,
              ]}
            />
          </Fragment>
        ))}
    </FeatureGroup>
  )
}

export default MapLayer
