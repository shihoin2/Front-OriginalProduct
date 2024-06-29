'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import NextArrow from '@/components/mapComponent/shopListComponents/NextArrow'
import PrevArrow from '@/components/mapComponent/shopListComponents/PrevArrow'

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
import { Card } from '@mui/material'

const ShopListCard = ({ shops, onSlideChange }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow next_arrow="next_arrow" />,
        prevArrow: <PrevArrow prev_arrow="prev_arrow" />,
        afterChange: onSlideChange,
    }

    return (
        <div className="list_card">
            <Slider {...settings}>
                {shops.map((shop, index) => (
                    <div key={index} className="list_item">
                        {/* <Card> */}
                        <a href={`/map/shop/${shop.id}`}>
                            <p>{shop.name}</p>
                        </a>
                        <p>{shop.address}</p>
                        <p>{shop.tel}</p>
                        {/* </Card> */}
                    </div>
                ))}
                {/* <ul>
                    {shops.map((shop, index) => (
                        <li key={index}>
                            <p>{shop.name}</p>
                            <p>{shop.address}</p>
                            <p>{shop.tel}</p>
                        </li>
                    ))}
                </ul> */}
            </Slider>
        </div>
    )
}

export default ShopListCard
