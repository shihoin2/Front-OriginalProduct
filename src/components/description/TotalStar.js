import React from 'react'
import { FaStar } from 'react-icons/fa6'

const TotalStar = ({ rating }) => {
    const stars = []

    // ratingの数だけ赤色の星を追加
    for (let i = 0; i < rating; i++) {
        stars.push(<FaStar key={i} color="#E55305" />)
    }
    for (let i = rating; i < 5; i++) {
        stars.push(<FaStar key={i + 5} color="grey" />)
    }

    return <div style={{ display: 'flex' }}>{stars}</div>
}

export default TotalStar
