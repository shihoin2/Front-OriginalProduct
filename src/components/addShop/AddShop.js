'use client'
import React, { useEffect, useState, useCallback, FormEvent } from 'react'
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'
import AddShopBar from './AddShopBar'
import AddShopMap from './AddShopMap'

const AddShop = ({}) => {
    return (
        <>
            <AddShopBar />
            <AddShopMap />
        </>
    )
}

export default AddShop
