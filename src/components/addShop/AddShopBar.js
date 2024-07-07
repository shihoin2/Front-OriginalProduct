'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import SearchBox from '@/components/mapPage/SearchBox'
import Button from '@/components/common/Button'
import AddShop from '../addShop/AddShop'

const AddShopBar = ({ shops, handlePlaceSelect, clickCurrentLocation }) => {
    return (
        <>
            {/* <div className="mr-3 w-4/5 max-h-full"> */}
            <div className="mr-3 h-screen flex flex-col">
                <p>店舗名で検索</p>
                <SearchBox onPlaceSelect={handlePlaceSelect} />
                <div className="mt-2 flex place-items-center text-sm"></div>
            </div>
        </>
    )
}

export default AddShopBar
