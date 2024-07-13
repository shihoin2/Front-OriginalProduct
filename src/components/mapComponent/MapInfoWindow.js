'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
    APIProvider,
    ControlPosition,
    Map,
    MapControl,
    InfoWindow,
    useAdvancedMarkerRef,
    AdvancedMarker,
    Pin,
} from '@vis.gl/react-google-maps'
import { Button } from '@mui/material'

const MarkerWithInfoWindow = ({ position, shop_name, address, tel }) => {
    const [markerRef, marker] = useAdvancedMarkerRef()

    const [infoWindowShown, setInfoWindowShown] = useState(false)

    const handleMarkerClick = useCallback(
        () => setInfoWindowShown(isShown => !isShown),
        [],
    )
    const handleClose = useCallback(() => setInfoWindowShown(false), [])

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                position={position}
                onClick={handleMarkerClick}
            />
            {infoWindowShown && (
                <InfoWindow
                    anchor={marker}
                    position={position}
                    onClose={handleClose}
                >
                    <>
                        <section className="text-gray-600 body-font overflow-hidden">
                            <div className="container px-5 pb-5">
                                {/* <div className="lg:w-4/5 mx-auto flex flex-wrap"> */}
                                {/* <img
                                        alt="ecommerce"
                                        className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                                        src="https://dummyimage.com/400x400"
                                    /> */}
                                <div className="w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                    <h1 className="text-gray-900 text-xl title-font font-medium mb-1">
                                        {shop_name}
                                    </h1>
                                    <div className="flex mb-4"></div>
                                    <p className="leading-relaxed">{address}</p>
                                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"></div>
                                    <div className="flex">
                                        <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                            Button
                                        </button>
                                    </div>
                                </div>
                                {/* </div> */}
                            </div>
                        </section>
                    </>

                    {/* <div>
                        <h1>{name}</h1>
                        <p>{address}</p>
                        <p>{tel}</p>
                    </div> */}
                </InfoWindow>
            )}
        </>
    )
}

export default MarkerWithInfoWindow
