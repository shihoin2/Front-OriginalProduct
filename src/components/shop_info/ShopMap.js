'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios'
import { APIProvider, Map, useMap, Marker } from '@vis.gl/react-google-maps'

const ShopMap = ({ lat, lng }) => {
    const map = useMap()

    useEffect(() => {
        if (map && lat && lng) {
            const parsedLat = parseFloat(lat)
            const parsedLng = parseFloat(lng)
            console.log(
                'Parsed Latitude:',
                parsedLat,
                'Parsed Longitude:',
                parsedLng,
            )
            map.panTo({ lat: parsedLat, lng: parsedLng })
        }
    }, [map, lat, lng])

    if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
        return <p>Invalid coordinates</p>
    }

    return (
        <>
            <div className="h-80 w-full max-w-lg">
                <Map
                    disableDefaultUI={true}
                    defaultZoom={15}
                    defaultCenter={{
                        lat: parseFloat(lat),
                        lng: parseFloat(lng),
                    }}
                    // defaultCenter={{
                    //     lat: parseFloat(lat),
                    //     lng: parseFloat(lng),
                    // }}
                    mapId="shopMap"
                    // style={{}}
                >
                    <Marker
                        position={{
                            lat: parseFloat(lat),
                            lng: parseFloat(lng),
                        }}
                    />
                </Map>
            </div>
        </>
    )
}
export default ShopMap
