'use client'
import {
    APIProvider,
    ControlPosition,
    Map,
    MapControl,
    useMap,
    InfoWindow,
    useMapsLibrary,
} from '@vis.gl/react-google-maps'
import ShopMap from '@/components/ShopMap'
import NewMap from '@/components/mapPage/Map'
import SideBar from '@/components/mapPage/SideBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import React from 'react'

export default function Page() {
    return (
        <>
            <Header link={'/'} page_title={'Map'} />
            <main>
                {/* <div className="flex"> */}
                {/* <SideBar /> */}
                {/* <div className="google_map"> */}
                <APIProvider
                    mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                    region="JP"
                    language="JP"
                >
                    {/* <ShopMap /> */}
                    <NewMap />
                </APIProvider>
                {/* </div> */}
                {/* </div> */}
            </main>
            <Footer />
        </>
    )
}
