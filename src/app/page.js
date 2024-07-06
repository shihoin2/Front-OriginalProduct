'use client'
// import ShopMap from '@/components/ShopMap'
// import Top from '@/components/TopPage/Top'
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
    return (
        <>
            <Header link={'/'} page_title={''} />
            <main></main>
            <Footer />
        </>
    )
}
