'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import SearchBox from '@/components/mapPage/SearchBox'
import { Modal, Box, Typography, TextField, IconButton } from '@mui/material'
import Button from '@/components/common/Button'
import AddShop from '../addShop/AddShop'
import { buttonBaseClasses } from '@mui/material'
import axios from 'axios'
import useCsrfToken from '@/hooks/useCsrfToken'
import { useRouter } from 'next/navigation'

const SideBar = ({
    shops,
    handlePlaceSelect,
    clickCurrentLocation,
    onShopAdded,
    // toggleAddShopModal,
}) => {
    const csrfToken = useCsrfToken()
    const [addShopOpen, setAddShopOpen] = useState(false)
    const [selectedPlace, setSelectedPlace] = useState({
        name: '',
        address: '',
        tel: '',
        lat: '',
        lng: '',
    })
    const handleAddShopModalOpen = () => {
        setAddShopOpen(true)
    }
    const handleAddShopModalClose = () => {
        setAddShopOpen(false)
    }

    const handleAddShopPlaceSelect = place => {
        setSelectedPlace({
            name: place.name,
            address: place.formatted_address,
            tel: place.formatted_phone_number,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        })
    }

    const handleAddShop = async () => {
        try {
            const response = await axios.post(

                'https://osyokuzi.site/api/mogu_search/shop',

                {
                    name: selectedPlace.name,
                    address: selectedPlace.address,
                    tel: selectedPlace.tel,
                    latitude: selectedPlace.lat,
                    longitude: selectedPlace.lng,
                },
                {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },
            )
            console.log('店舗が登録されました:', response.data)
            setAddShopOpen(false)
            onShopAdded()
            setSelectedPlace({
                name: '',
                address: '',
                tel: '',
                lat: '',
                lng: '',
            })
        } catch (error) {
            console.error('店舗の登録中にエラーが発生しました:', error)
        }
    }

    return (
        <>
            {/* <div className="mr-3 w-4/5 max-h-full"> */}
            <div className="px-5 pt-5 mr-3 w-full h-screen flex flex-col">
                <p>地名で検索</p>
                <SearchBox onPlaceSelect={handlePlaceSelect} />
                <div className="my-4 flex place-items-center justify-between">
                    <p>現在地から検索</p>
                    <Button
                        type={'button'}
                        buttonName={'周辺の店舗を取得'}
                        className={'ml-2'}
                        onClick={clickCurrentLocation}
                    />
                </div>

                {shops && shops.length > 0 ? (
                    <>
                        <div className="flex space-x-4 pt-4 border-t-2 justify-between">
                            <div className="mt-2">周辺の店舗</div>
                            <Button
                                // href="#"
                                type={'button'}
                                buttonName={'新しく店舗を登録'}
                                onClick={handleAddShopModalOpen}
                                className="ml-2"
                            />
                        </div>
                        <dl className="max-w-md divide-y divide-gray-200 overflow-y-auto flex-grow p-3">
                            {/* <div className="w-full overflow-y-auto"> */}
                            {shops &&
                                shops.map((shop, index) => (
                                    <div key={index} className="p-3">
                                        <a href={`/map/shop/${shop.id}`}>
                                            <p>{shop.name}</p>
                                        </a>
                                        <p>{shop.address}</p>
                                        <p>Tell：{shop.tel}</p>
                                    </div>
                                ))}
                        </dl>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between mt-2 py-2 border-t-2">
                            <div className="mt-2">周辺にはありません</div>
                            <Button
                                // href="#"
                                type={'button'}
                                buttonName={'新しく店舗を登録'}
                                onClick={handleAddShopModalOpen}
                                className="ml-2"
                            />
                        </div>
                    </>
                )}
            </div>

            {addShopOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3
                                            className="text-lg leading-6 font-medium text-gray-900"
                                            id="modal-headline"
                                        >
                                            店舗を登録
                                        </h3>
                                        <div className="mt-2">
                                            <Typography>
                                                店舗名で検索
                                            </Typography>
                                            <SearchBox
                                                onPlaceSelect={
                                                    handleAddShopPlaceSelect
                                                }
                                            />
                                            <TextField
                                                label="店舗名"
                                                value={selectedPlace.name}
                                                fullWidth
                                                variant="outlined"
                                                margin="normal"
                                            />
                                            <TextField
                                                label="住所"
                                                value={selectedPlace.address}
                                                fullWidth
                                                variant="outlined"
                                                margin="normal"
                                            />
                                            <TextField
                                                label="電話番号"
                                                value={selectedPlace.tel}
                                                fullWidth
                                                variant="outlined"
                                                margin="normal"
                                            />
                                            <input
                                                type="hidden"
                                                value={selectedPlace.lat}
                                            />
                                            <input
                                                type="hidden"
                                                value={selectedPlace.lng}
                                            />
                                            <Button
                                                type={'button'}
                                                onClick={handleAddShop}
                                                buttonName={'店舗を登録'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <Button
                                    type="button"
                                    onClick={handleAddShopModalClose}
                                    buttonName={'閉じる'}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SideBar
