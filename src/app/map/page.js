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
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import React from 'react'

export default function Page() {
    return (
        <>
            <Header link={'/'} page_title={'Map'} />
            <main>
                <APIProvider
                    mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                    region="JP"
                    language="JP"
                >
                    <div className="google_map">
                        <ShopMap />
                    </div>
                </APIProvider>
            </main>
            <Footer />
        </>
    )
}
