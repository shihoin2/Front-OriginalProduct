'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios'
import {
    APIProvider,
    ControlPosition,
    Map,
    MapControl,
    useMap,
    InfoWindow,
    useMapsLibrary,
} from '@vis.gl/react-google-maps'
import MarkerWithInfoWindow from '@/components/mapComponent/MapInfoWindow'
import ShopListCard from './ShopListCard'
import { Autocomplete } from './AutoComplete'

const ShopMap = () => {
    // export default function ShopMap() {
    // const [markerWithInfoWindowPosition, setMarkerWithInfoWindowPosition] =
    //     useState({
    //         lat: 34.6601133,
    //         lng: 135.1335401,
    //     })
    // 登録している店舗情報の一覧
    const [markerPositions, setMarkerPositions] = useState([])
    const [selectedShopId, setSelectedShopId] = useState(null)

    const [userLocation, setUserLocation] = useState(null)
    const [filteredPositions, setFilteredPositions] = useState([])
    const [showShopList, setShowShopList] = useState(true)

    const map = useMap()

    useEffect(() => {
        getUserLocation()
        getMapData()
    }, [])

    useEffect(() => {
        if (userLocation) {
            filterPositions(userLocation)
        }
    }, [userLocation, markerPositions])

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    })
                },
                error => {
                    console.error('Error obtaining user location', error)
                },
            )
        } else {
            console.error('Geolocation is not supported by this browser.')
            // ブラウザがGeolocationをサポートしていない場合にユーザーに通知するなどの処理を追加する
        }
    }

    const getMapData = async () => {
        try {
            const response = await axios.get(
                // 'http://localhost:8000/api/mogu_search/shop',
                'http://osyokuzi.site/api/mogu_search/shop',
            )
            setMarkerPositions(response.data)
            // console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const filterPositions = (center, radius = 3000) => {
        const filtered = markerPositions.filter(position => {
            const distance = calculateDistance(center, {
                lat: position.latitude,
                lng: position.longitude,
            })
            return distance <= radius
        })
        setFilteredPositions(filtered)
        setShowShopList(filtered.length > 0)
    }

    const calculateDistance = (center, position) => {
        const toRad = x => (x * Math.PI) / 180
        const R = 6371 // 地球の半径（km）
        const dLat = toRad(position.lat - center.lat)
        const dLon = toRad(position.lng - center.lng)
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(center.lat)) *
                Math.cos(toRad(position.lat)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c * 1000 // 距離（m）を返す
    }

    const handleSlideChange = current => {
        // const selectedMarker = markerPositions[current]
        const selectedMarker = filteredPositions[current]
        if (selectedMarker && map) {
            const { latitude, longitude } = selectedMarker
            // setSelectedShopId(selectedMarker.id)
            map.panTo({ lat: latitude, lng: longitude })
        }
    }

    const handlePlaceSelect = useCallback(
        place => {
            if (place.geometry && map) {
                const { location } = place.geometry
                const newCenter = { lat: location.lat(), lng: location.lng() }
                map.panTo(newCenter)
                filterPositions(newCenter)
                // mapRef.current.panTo({ lat: location.lat(), lng: location.lng() })
            }
        },
        [filterPositions, map],
    )

    return (
        <>
            {/* <APIProvider
                mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                region="JP"
                language="JP"
            > */}
            <Autocomplete onPlaceSelect={handlePlaceSelect} />
            <div className="map_container">
                {/* <button onClick={handleGetCurrentLocation}>現在地取得</button> */}
                <Map
                    className="map"
                    disableDefaultUI={true}
                    defaultZoom={15}
                    defaultCenter={{ lat: 34.6601133, lng: 135.1335401 }}
                    mapId="shopMap"
                    onLoad={map => {
                        if (userLocation) {
                            map.panTo(userLocation)
                        }
                    }}
                    // className="shopMap"
                    // ref={mapRef}
                >
                    {/* {markerPositions.map((position, index) => ( */}
                    {filteredPositions.map((position, index) => (
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
                {showShopList && (
                    <ShopListCard
                        shops={filteredPositions}
                        // shops={markerPositions}
                        onSlideChange={handleSlideChange}
                    />
                )}
            </div>
            {/* </APIProvider> */}
        </>
    )
}
export default ShopMap
