'use client'
import { useParams } from 'next/navigation'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
import useCsrfToken from '@/hooks/useCsrfToken'
import axios from 'axios'
import { ShopOutlined } from '@mui/icons-material'
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps'
import {
    Fab,
    Tooltip,
    Box,
    Modal,
    Dialog,
    Typography,
    TextareaAutosize,
    TextField,
} from '@mui/material'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import Link from 'next/link'
import ShopMap from '@/components/shop_info/ShopMap'
import Button from '@/components/common/Button'
import TotalStar from '@/components/description/TotalStar'
import AvStar from '@/components/description/AvStar'
// import ReviewDescription from '../description/ReviewDescription'

export function ShopInfo() {
    const [shopInfo, setShopInfo] = useState([])
    const params = useParams()
    const shopId = params.shopId
    const [productName, setProductName] = useState('')
    const [open, setOpen] = useState(false)
    const [selectedProductReviews, setSelectedProductReviews] = useState([])

    useEffect(() => {
        const getShopInfo = async () => {
            try {
                const response = await axios.get(
                    `http://localhost/api/mogu_search/shop/${shopId}`,
                    // `https://osyokuzi.site/api/mogu_search/shop/${shopId}`,
                )
                setShopInfo(response.data)
                console.log(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (shopId) {
            getShopInfo()
        }
    }, [shopId])

    if (!shopInfo) {
        return <p>Loading...</p>
    }
    const handleOpen = reviews => {
        setSelectedProductReviews(reviews)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const lat = parseFloat(shopInfo.latitude)
    const lng = parseFloat(shopInfo.longitude)

    return (
        <>
            {/* <div className="mt-4 mx-10 w-full flex flex-col sm:flex-row place-items-center sm:h-1/2 "> */}
            <div className="mt-4 w-full h-auto flex flex-col space-y-4 sm:flex-row place-items-center sm:h-1/2 px-14 sm:space-x-4 sm:justify-between">
                {/* <div className="h-1/2 sm:w-1/2 mb-4 sm:h-full"> */}

                <APIProvider
                    mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                    region="JP"
                    language="JP"
                >
                    <ShopMap lat={lat} lng={lng} />
                </APIProvider>
                {/* </div> */}
                <div className="h-1/2  relative overflow-x-auto  sm:rounded-lg sm:w-1/2">
                    <table className=" text-sm text-left rtl:text-right">
                        <tbody>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap bg-[#F7F7F7]"
                                >
                                    店名
                                </th>
                                <td className="px-6 py-4">{shopInfo.name}</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap bg-[#F7F7F7]"
                                >
                                    住所
                                </th>
                                <td className="px-6 py-4">
                                    {shopInfo.address}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap bg-[#F7F7F7]"
                                >
                                    電話番号
                                </th>
                                <td className="px-6 py-4">{shopInfo.tel}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-4 mx-10">
                {/* </Fab> */}
                <div className="relative overflow-x-auto mb-4 sm:rounded-lg">
                    <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                        {/* <div className="space-x-3 flex fle-row place-items-center mb-1 "> */}
                        <caption className=" p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                            販売商品
                            {/* 商品追加ボタン */}
                            <Link href={`/map/shop/add_product/${shopId}`}>
                                <Button
                                    type={'button'}
                                    buttonName={'この店に商品を追加'}
                                    className={'ml-4'}
                                />
                            </Link>
                        </caption>

                        {/* </div> */}
                        <colgroup>
                            <col />
                        </colgroup>
                        <colgroup span={2} />
                        <colgroup span={4} />
                        <colgroup span={1} />

                        <thead className="text-xs text-gray-700 text-center uppercase bg-gray-50 ">
                            <tr>
                                <th
                                    rowSpan={2}
                                    scope="col"
                                    className="px-6 py-3"
                                >
                                    商品
                                </th>
                                <th
                                    rowSpan={2}
                                    scope="col"
                                    className="px-6 py-3"
                                >
                                    メーカー
                                </th>
                                <th
                                    colSpan={4}
                                    scope="col"
                                    className="px-6 py-3 "
                                >
                                    嚥下グレード
                                </th>
                                <th
                                    rowSpan={2}
                                    scope="col"
                                    className="px-6 py-3"
                                >
                                    レビュー
                                </th>
                            </tr>

                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    学会分類2021
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    嚥下食ピラミッド
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    UDF(ユニバーサルデザインフード)
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    スマイルケア食
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {shopInfo.products &&
                                shopInfo.products.map(product => {
                                    const totalReviews = product.reviews.length
                                    const averageRating = totalReviews
                                        ? (
                                              product.reviews.reduce(
                                                  (sum, review) =>
                                                      sum + review.rating,
                                                  0,
                                              ) / totalReviews
                                          ).toFixed(1)
                                        : 0
                                    return (
                                        <tr
                                            key={product.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                        >
                                            <td className="py-4 space-x-4">
                                                <a
                                                    href={`/product/${product.id}`}
                                                    className="flex items-center"
                                                >
                                                    <img
                                                        className="size-16 mr-2"
                                                        src={product.image_path}
                                                        alt={product.name}
                                                    />
                                                    <p>{product.name}</p>
                                                </a>
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.manufacturer}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.JDD2021_code}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.FFPWD_code}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.UDF_code}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.SCF_code}
                                            </td>
                                            <td className="px-6 py-4">
                                                <AvStar
                                                    averageRating={
                                                        averageRating
                                                    }
                                                    totalReviews={totalReviews}
                                                    onClick={() =>
                                                        handleOpen(
                                                            product.reviews,
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        maxWidth: 500,
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        商品レビュー
                    </Typography>
                    <div className="">
                        {selectedProductReviews &&
                        selectedProductReviews.length > 0 ? (
                            selectedProductReviews.map(review => (
                                <div
                                    key={review.id}
                                    className="  items-center text-base font-semibold text-gray-900 dark:text-white"
                                >
                                    {/* <TotalStar rating={review.rating} /> */}
                                    <Typography variant="body2">
                                        <div className="flex items-center mb-1">
                                            <div className="font-medium dark:text-white">
                                                <p>{review.user.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                                            <TotalStar rating={review.rating} />
                                            <p className="block text-sm text-gray-500 dark:text-gray-400">
                                                {review.updated_at}
                                            </p>
                                        </div>
                                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                                            {review.description}
                                        </p>

                                        {/* {review.description} */}
                                        {/* <ReviewDescription review={review} /> */}
                                    </Typography>
                                </div>
                            ))
                        ) : (
                            <Typography variant="body2">
                                レビューがありません。
                            </Typography>
                        )}
                    </div>
                </Box>
            </Modal>

            {/* {product.reviews &&
                product.reviews.map(review => (
                    <div
                        key={review.id}
                        className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
                    >
                        <p>Rating:{review.rating} stars</p>
                        <p>{review.description}</p>
                    </div>
                ))} */}

            {/* レビュー追加ボタン */}
        </>
    )
}
