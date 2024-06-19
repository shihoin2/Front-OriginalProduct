import React, { useEffect } from 'react'
import { APIProvider, useMap } from '@vis.gl/react-google-maps'

const App = () => (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
            style={{ width: '100vw', height: '100vh' }}
            defaultCenter={{ lat: 22.54992, lng: 0 }}
            defaultZoom={3}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
        />
    </APIProvider>
)

const root = createRoot(document.querySelector())
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
