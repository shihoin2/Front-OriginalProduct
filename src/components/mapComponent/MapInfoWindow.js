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

const MarkerWithInfoWindow = ({ position, name, address, tel }) => {
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
                    <div>
                        <h1>{name}</h1>
                        <p>{address}</p>
                        <p>{tel}</p>
                    </div>
                </InfoWindow>
            )}
        </>
    )
}

export default MarkerWithInfoWindow
