'use client'
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import {
    APIProvider,
    ControlPosition,
    Map,
    MapControl,
    InfoWindow,
} from '@vis.gl/react-google-maps'
import MarkerWithInfoWindow from '@/components/mapComponent/MapInfoWindow'
import ShopListCard from './ShopListCard'

const ShopMap = () => {
    // export default function ShopMap() {
    const [markerWithInfoWindowPosition, setMarkerWithInfoWindowPosition] =
        useState({
            lat: 34.6601133,
            lng: 135.1335401,
        })
    // 登録している店舗情報の一覧
    const [markerPositions, setMarkerPositions] = useState([])

    const mapRef = useRef(null)

    useEffect(() => {
        getMapData()
    }, [])

    const getMapData = async () => {
        try {
            const response = await axios.get(
                // 'http://localhost/api/mogu_search/shop',
                'http://54.249.109.215/api/mogu_search/shop',
            )
            setMarkerPositions(response.data)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSlideChange = current => {
        const selectedMarker = markerPositions[current]
        if (selectedMarker && mapRef.current) {
            const { latitude, longitude } = selectedMarker
            mapRef.current.panTo({ lat: latitude, lng: longitude })
            console.log(mapRef.current.panTo({ lat: latitude, lng: longitude }))
        }
    }

    return (
        <APIProvider
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
            region="JP"
            language="JP"
        >
            <div className="map_container">
                <Map
                    className="map"
                    disableDefaultUI={true}
                    defaultZoom={15}
                    defaultCenter={{ lat: 34.6601133, lng: 135.1335401 }}
                    // zoomControl={true}
                    mapId="shopMap"
                    // className="shopMap"
                    ref={mapRef}
                >
                    {markerPositions.map((position, index) => (
                        <MarkerWithInfoWindow
                            key={index}
                            // position={markerWithInfoWindowPosition} />
                            position={{
                                lat: position.latitude,
                                lng: position.longitude,
                            }}
                            name={position.name}
                            address={position.address}
                            tel={position.tel}
                        />
                    ))}
                </Map>
                <ShopListCard
                    shops={markerPositions}
                    onSlideChange={handleSlideChange}
                />
            </div>
        </APIProvider>
    )
}
export default ShopMap
