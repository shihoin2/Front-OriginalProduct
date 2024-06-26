'use client'
import React, { useEffect, useState, useCallback, FormEvent } from 'react'
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'

// This is a custom built autocomplete component using the "Autocomplete Service" for predictions
// and the "Places Service" for place details
export const Autocomplete = ({ onPlaceSelect }) => {
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
                placeId,
                fields: ['geometry', 'name', 'formatted_address'],
                sessionToken,
            }

            const detailsRequestCallback = placeDetails => {
                onPlaceSelect(placeDetails)
                setPredictionResults([])
                setInputValue(placeDetails?.formatted_address ?? '')
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
        <div className="autocomplete-container">
            <input
                className="autocomplete-input"
                value={inputValue}
                onInput={event => onInputChange(event)}
                placeholder="Search for a place"
            />

            {predictionResults.length > 0 && (
                <ul className="autocomplete-list">
                    {predictionResults.map(({ place_id, description }) => {
                        return (
                            <li
                                key={place_id}
                                className="autocomplete-list-item"
                                onClick={() => handleSuggestionClick(place_id)}
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
