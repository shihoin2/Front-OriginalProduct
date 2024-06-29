'use client'
// import LoginLinks from '@/app/LoginLinks'
// import { ShopInfo } from '@/components/shop_info/ShopInfo'
// import axios from 'axios'
// // import { useState } from 'react';
// import { MapMarker } from '@/components/MapMarker'
import ShopMap from '@/components/ShopMap'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Autocomplete } from '@/components/AutoComplete'
import {
    APIProvider,
    ControlPosition,
    Map,
    MapControl,
    useMap,
    InfoWindow,
    useMapsLibrary,
} from '@vis.gl/react-google-maps'
import React from 'react'

export default function Page() {
    //   const [state, setState] = useState('')

    //   const getTest = async () => {
    //     try {
    //       const response = await axios.get('http://localhost/api/test')
    //       setState(response.data)
    //       console.log(response.data)
    //     } catch (err) {
    //       console.log(err)
    //     }
    //   }

    return (
        <>
            <Header link={'/'} page_title={'Map'} />
            <main>
                <div className="google_map">
                    <APIProvider
                        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                        region="JP"
                        language="JP"
                    >
                        <ShopMap />
                    </APIProvider>
                </div>
            </main>
            <Footer />
        </>
    )
}
