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
import AddShopBar from '../addShop/AddShopBar'
import ShopListCard from '@/components/ShopListCard'
import SideBar from '@/components/mapPage/SideBar'

const NewMap = () => {
    // const [selectedShopId, setSelectedShopId] = useState(null)
    const [userLocation, setUserLocation] = useState(null)
    const [showShopList, setShowShopList] = useState(true)
    const [markerPositions, setMarkerPositions] = useState([])
    const [filteredPositions, setFilteredPositions] = useState([])
    const [currentLocationMarker, setCurrentLocationMarker] = useState(null)
    const [searchLocationMarker, setSearchLocationMarker] = useState(null)
    const [showAddShopModal, setShowAddShopModal] = useState(false)

    const map = useMap()

    useEffect(() => {
        getUserLocation()
    }, [])
    useEffect(() => {
        getMapData()
    }, [])

    useEffect(() => {
        if (!userLocation) {
            setFilteredPositions(markerPositions)
        } else {
            filterPositions(userLocation)
        }
    }, [markerPositions, userLocation])

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                    // console.log(location)
                    setUserLocation(location)
                    if (map) {
                        map.panTo(location)
                        map.setZoom(15)
                        setCurrentLocationMarker({
                            lat: location.lat,
                            lng: location.lng,
                        })
                    }
                    // filterPositions(location)
                },
                error => {
                    console.error('Error obtaining user location', error)
                    setDefaultCenter()
                },
            )
        } else {
            console.error('Geolocation is not supported by this browser.')
            setDefaultCenter()
        }
    }

    const setDefaultCenter = () => {
        map.setCenter({
            lat: 35.689,
            lng: 139.692,
        })
        map.setZoom(8)
    }

    const getMapData = async () => {
        try {
            const response = await axios.get(
                'https://osyokuzi.site/api/mogu_search/shop',
                // 'http://localhost/api/mogu_search/shop',
            )
            setMarkerPositions(response.data)
            setFilteredPositions(response.data)
            console.log(response.data)
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

    // const handleSlideChange = current => {
    //     // const selectedMarker = markerPositions[current]
    //     const selectedMarker = filteredPositions[current]
    //     if (selectedMarker && map) {
    //         const { latitude, longitude } = selectedMarker
    //         // setSelectedShopId(selectedMarker.id)
    //         map.panTo({ lat: latitude, lng: longitude })
    //     }
    // }

    const handlePlaceSelect = useCallback(
        place => {
            if (place.geometry && map) {
                const { location } = place.geometry
                const newCenter = { lat: location.lat(), lng: location.lng() }
                map.panTo(newCenter)
                map.setZoom(15)
                filterPositions(newCenter)
                setSearchLocationMarker({
                    lat: location.lat(),
                    lng: location.lng(),
                })
                // setInputValue('')
                // mapRef.current.panTo({ lat: location.lat(), lng: location.lng() })
            }
        },
        [filterPositions, map],
    )

    const handleMarkerClick = useCallback(
        position => {
            map.panTo(position)
            map.setZoom(15)
        },
        [map],
    )

    const handleShopAdded = () => {
        getMapData()
    }

    return (
        <>
            <div className="flex flex-row h-screen w-full">
                <div className="basis-1/4 flex h-full">
                    <SideBar
                        handlePlaceSelect={handlePlaceSelect}
                        shops={filteredPositions}
                        // onSlideChange={handleSlideChange}
                        clickCurrentLocation={getUserLocation}
                        onShopAdded={handleShopAdded}
                    />
                </div>
                {/* <SearchBox onPlaceSelect={handlePlaceSelect} /> */}
                <div className="basis-3/4 h-50 flex-col">
                    {/* <SubBar handlePlaceSelect={handlePlaceSelect} /> */}
                    <div className="h-full">
                        <Map
                            // className="map"
                            disableDefaultUI={true}
                            // defaultZoom={15}
                            defaultZoom={12}
                            defaultCenter={{
                                lat: userLocation ? userLocation.lat : 35.689,
                                lng: userLocation ? userLocation.lng : 139.692,
                            }}
                            mapId="shopMap"
                            onLoad={map => {
                                if (userLocation) {
                                    map.panTo(userLocation)
                                    setCurrentLocationMarker({
                                        lat: userLocation.lat,
                                        lng: userLocation.lng,
                                    })
                                }
                            }}
                        >
                            {markerPositions.map((position, index) => (
                                // {filteredPositions.map((position, index) => (
                                <MarkerWithInfoWindow
                                    key={index}
                                    // position={markerWithInfoWindowPosition} />
                                    position={{
                                        lat: position.latitude,
                                        lng: position.longitude,
                                    }}
                                    shop_name={position.name}
                                    address={position.address}
                                    tel={position.tel}
                                    shopId={position.id}
                                    onClick={() =>
                                        handleMarkerClick({
                                            lat: position.latitude,
                                            lng: position.longitude,
                                        })
                                    }
                                />
                            ))}
                            {/* {currentLocationMarker && (
                                <MarkerWithInfoWindow
                                    position={currentLocationMarker}
                                    icon={{
                                        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', //
                                    }}
                                    shop_name="Current Location"
                                />
                            )}
                            {searchLocationMarker && (
                                <MarkerWithInfoWindow
                                    position={searchLocationMarker}
                                    icon={{
                                        url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
                                    }}
                                    shop_name="Searched Location"
                                />
                            )} */}
                        </Map>
                    </div>
                </div>
            </div>
        </>
    )
}
export default NewMap
