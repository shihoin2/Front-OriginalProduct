'use client'

import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import PlaceInfo from '../PlaceInfo'
import { useState, useEffect, useRef } from 'react'

const defaultLatLng = {
    lat: 35.658584,
    lng: 139.745433,
}

const controlOption = {
    mapTypeControl: false,
    fullscreenControl: false,
}

const containerStyle = {
    width: '100%',
    height: '100%',
}
const position = {
    lat: 35.658584,
    lng: 139.745433,
}

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
export default function ShopMap() {
    return (
        // <div className="mx-auto max-w-md ">
        <div className="flex h-40 max-w-md items-center justify-center">
            {/* <div className="h-1/3"> */}
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    center={defaultLatLng}
                    mapContainerStyle={containerStyle}
                    zoom={15}
                    options={controlOption}
                >
                    <MarkerF position={position} />
                    <PlaceInfo />
                </GoogleMap>
            </LoadScript>
            {/* <div class="mx-auto max-w-md"> */}
            {/* <div class="flex h-40 max-w-md items-center justify-center bg-blue-50"> */}
            {/* <div class="h-20 w-20 rounded bg-blue-500"></div> */}
        </div>
        // </div>
        // </div>
    )
}
