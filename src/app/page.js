'use client'
import LoginLinks from '@/app/LoginLinks'
import { ShopInfo } from '@/components/shop_info/ShopInfo'
import axios from 'axios'
// import { useState } from 'react';
import { MapMarker } from '@/components/MapMarker'
import ShopMap from '@/components/ShopMap'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'

export default function Page() {
    //   const [state, setState] = useState('')

    //   const getTest = async () => {
    //     try {
    //       const response = await axios.get('http://localhost/api/test')
    //       setState(response.data)
    //       console.log(response.data)
    //     } catch (err) {
    //       console.log(err)
    //     }
    //   }

    return (
        <>
            <ShopMap />
        </>
    )
}
