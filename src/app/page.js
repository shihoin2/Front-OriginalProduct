'use client'
import LoginLinks from '@/app/LoginLinks'
import { ShopInfo } from '@/components/shop_info/ShopInfo'
import axios from 'axios'
// import { useState } from 'react';
import { MapMarker } from '@/components/MapMarker'
import { Test } from '@/components/Test'
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
            {/* 通信テスト
      <button onClick={getTest}>Click!!</button>
      <span>　{state}</span> */}
            <ShopInfo />
        </>
    )
}
