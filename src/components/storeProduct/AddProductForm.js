import React, { useState, useEffect, useRef } from 'react'

export default function StarRating({ totalStars = 5 }) {
    const [rateStar, setRateStar] = useState(0)

    return (
        <>
            {[...Array(totalStars)].map((n, i) => (
                <Star
                    key={i}
                    selected={rateStar > i}
                    onSelect={() => setRateStar(i + 1)}
                />
            ))}
            <p>
                {rateStar} of {totalStars} stars
            </p>
        </>
    )
}