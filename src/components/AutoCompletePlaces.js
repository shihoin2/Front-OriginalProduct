'use client'
import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import axios from 'axios'

export default function SearchBox() {
    // class App extends Component {
    const [locationName, setLocationName] = useState('')
    const [center, setCenter] = useState({ lat: '', lng: '' })
    // const [isShowMarker, setIsShowMaker] = useState(false)
    const [currentPosition, setCurrentPosition] = useState()
    const [mapMarker, setMapMaker] = useState([])

    const success = data => {
        currentPosition = {
            lat: data.coords.latitude,
            lng: data.coords.longitude,
        }
        setCurrentPosition(currentPosition)
        setCenter(currentPosition)
    }
    // const error = data => {
    const error = () => {
        currentPosition = {
            lat: 34.6688,
            lng: 135.1222,
        }
        setCurrentPosition(currentPosition)
        setCenter(currentPosition)
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error)
    }, [])
    useEffect(() => {
        getMapData()
    }, [])

    const getMapData = async () => {
        try {
            const response = await axios.get(
                'http://localhost/api/mogu_search/shop',
            )
            setMapMaker(response.data)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    // ﾌｫｰﾑ入力をsetする。
    const changeLocationName = e => {
        // 押したｷｰﾎﾞｰﾄﾞがEnterだったら
        if (e.key === 'Enter') {
            geocode()
            return
        }
        // setLocationNameでﾌｫｰﾑ入力内容に更新
        setLocationName(e.target.value)
    }

    const geocode = () => {
        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({ address: locationName }, (results, status) => {
            if (status === 'OK') {
                const newCenter = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng(),
                }
                setCenter(newCenter)
                // setIsShowMaker(true);
            }
        })
    }

    const containerStyle = {
        width: '100%',
        height: '85vh',
    }

    const controlOption = {
        mapTypeControl: false,
        fullscreenControl: false,
    }

    return (
        <div>
            {/* <input
          className="search_box"
          type='text'
          onChange={changeLocationName}
          value={locationName}
          onKeyPress={changeLocationName} /> */}

            <div className="mx-auto max-w-xs">
                <div>
                    <div className="group absolute z-50 mt-2">
                        <input
                            type="text"
                            id="example9"
                            className="block w-full rounded-md border-gray-300 px-10 shadow-sm transition-all hover:bg-gray-50 focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                            placeholder="Quick search..."
                            // className="search_box"
                            onChange={changeLocationName}
                            value={locationName}
                            onKeyPress={changeLocationName}
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2.5 text-gray-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5">
                            <span className="rounded border px-1.5 text-sm text-gray-400 shadow-sm transition-all group-hover:border-primary-500 group-hover:text-primary-500">
                                <kbd>⌘</kbd> <kbd>K</kbd>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <LoadScript
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={18}
                    options={controlOption}
                >
                    {mapMarker.map(shop => (
                        <MarkerF
                            key={shop.id}
                            position={{
                                lat: shop.latitude,
                                lng: shop.longitude,
                            }}
                        />
                    ))}
                    {/* { isShowMarker && <Marker position={center} /> } */}
                </GoogleMap>
            </LoadScript>
        </div>
    )
}
