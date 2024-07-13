'use client'
import React, { useEffect, useState, useCallback, FormEvent } from 'react'
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'

// This is a custom built autocomplete component using the "Autocomplete Service" for predictions
// and the "Places Service" for place details
const SearchBox = ({ onPlaceSelect }) => {
    const map = useMap()
    const places = useMapsLibrary('places')
    const [sessionToken, setSessionToken] = useState()
    const [autocompleteService, setAutocompleteService] = useState(null)
    const [placesService, setPlacesService] = useState(null)
    const [predictionResults, setPredictionResults] = useState([])
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if (!places || !map) return

        setAutocompleteService(new places.AutocompleteService())
        setPlacesService(new places.PlacesService(map))
        setSessionToken(new places.AutocompleteSessionToken())

        return () => setAutocompleteService(null)
    }, [map, places])

    const fetchPredictions = useCallback(
        async inputValue => {
            if (!autocompleteService || !inputValue) {
                setPredictionResults([])
                return
            }

            const request = { input: inputValue, sessionToken }
            const response = await autocompleteService.getPlacePredictions(
                request,
            )

            setPredictionResults(response.predictions)
        },
        [autocompleteService, sessionToken],
    )

    const onInputChange = useCallback(
        event => {
            const value = event.target?.value

            setInputValue(value)
            fetchPredictions(value)
        },
        [fetchPredictions],
    )

    const handleSuggestionClick = useCallback(
        placeId => {
            if (!places) return

            const detailRequestOptions = {
                // placeId,
                placeId: placeId,
                fields: [
                    'geometry',
                    'name',
                    'formatted_address',
                    'formatted_phone_number',
                ],
                sessionToken,
            }
            console.log(detailRequestOptions)

            const detailsRequestCallback = placeDetails => {
                onPlaceSelect(placeDetails)
                setPredictionResults([])
                // setInputValue(placeDetails?.formatted_address ?? '')
                setInputValue('')
                setSessionToken(new places.AutocompleteSessionToken())
            }

            placesService?.getDetails(
                detailRequestOptions,
                detailsRequestCallback,
            )
        },
        [onPlaceSelect, places, placesService, sessionToken],
    )

    return (
        // <div className="autocomplete-container">
        <div className="relative w-full mt-1">
            <input
                // className="autocomplete-input"
                className="w-full p-2 box-border rounded border-solid border-gray-300"
                value={inputValue}
                onInput={event => onInputChange(event)}
                placeholder="Search for a place"
            />

            {predictionResults.length > 0 && (
                <ul className="list-none bg-white border-solid border-[#ccc] rounded-t max-h-48 overflow-y-auto z-[1000] absolute">
                    {predictionResults.map(({ place_id, description }) => {
                        // {predictionResults.map(({ place_id, description }) => {
                        return (
                            <li
                                key={place_id}
                                // key={placeId}
                                className="p-2 cursor-pointer hover:bg-[#f0f0f0]"
                                onClick={() => handleSuggestionClick(place_id)}
                                // onClick={() => handleSuggestionClick(placeID)}
                            >
                                {description}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}

export default SearchBox
