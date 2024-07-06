'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { SearchBox } from '@/components/mapPage/SearchBox'
import Button from '@/components/common/Button'

const SideBar = ({ shops, handlePlaceSelect, clickCurrentLocation }) => {
    return (
        <>
            {/* <div className="mr-3 w-4/5 max-h-full"> */}
            <div className="mr-3 h-screen flex flex-col">
                <p>地名で検索</p>
                <SearchBox onPlaceSelect={handlePlaceSelect} />
                <div className="mt-2 flex place-items-center text-sm">
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
                        <div className="mt-2">周辺の店舗</div>
                        <dl className="max-w-md divide-y divide-gray-200 overflow-y-auto flex-grow mt-0">
                            {/* <div className="w-full overflow-y-auto"> */}
                            {shops &&
                                shops.map((shop, index) => (
                                    <div key={index} className="list_item ">
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
                        <div className="max-w-sm py-6">
                            <div className="mt-2">周辺にはありません</div>

                            <a
                                href="#"
                                class="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700 text-xs"
                            >
                                店舗を登録
                                <IoIosArrowForward />
                            </a>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default SideBar
