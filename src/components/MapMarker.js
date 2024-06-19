'use client'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import PlaceInfo from './PlaceInfo'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export function MapMarker() {
    const [mapMarker, setMapMaker] = useState([])

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

    // const position = {
    //   lat: 34.6688,
    //   lng: 135.1222
    // }

    const controlOption = {
        mapTypeControl: false,
        fullscreenControl: false,
    }

    const containerStyle = {
        width: '80%',
        height: '30vh',
        //地図の幅と高さを連想配列にします。
        //ちなみにこのライブラリの地図はmapContainerStyleイベントでしか
        //サイズ変更できません(多分)
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY

    return (
        <>
            {/* <div class="mx-auto max-w-md ">
      <div class="flex h-40 max-w-md items-center justify-center">
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            center={position}
            mapContainerStyle={containerStyle}
            zoom={13}
            options={controlOption}> */}
            {mapMarker.map(shop => (
                <MarkerF
                    key={shop.id}
                    position={{ lat: shop.latitude, lng: shop.longitude }}
                />
            ))}
            {/* </GoogleMap>
        </LoadScript>
      </div>
    </div> */}
        </>
    )
}
