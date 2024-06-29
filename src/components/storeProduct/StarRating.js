import React, { useState, useEffect, useRef } from 'react'
import { FaStar } from 'react-icons/fa'
import { Star } from './Star'

export default function StarRating({ totalStars = 5, onRateChange }) {
    const [rateStar, setRateStar] = useState(0)
    console.log(rateStar)

    // const handleSelect = i => {
    //     const newRateStar = i + 1
    //     setRateStar(newRateStar)
    //     onRateChange(newRateStar)
    // }

    const handleSelect = newRateStar => {
        setRateStar(newRateStar)
        onRateChange(newRateStar)
        console.log(newRateStar)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            {[...Array(totalStars)].map((n, i) => (
                <Star
                    key={i}
                    selected={rateStar > i}
                    onSelect={() => handleSelect(i + 1)}
                    // onSelect={() => setRateStar(i + 1)}
                    // onClick={() => handleSelect(i)}
                />
            ))}
            {/* <p>
                {rateStar} of {totalStars} stars
            </p> */}
        </div>
    )
}
