'use client'
import { useParams } from 'next/navigation'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
import useCsrfToken from '@/hooks/useCsrfToken'
import axios from 'axios'
import { ShopOutlined } from '@mui/icons-material'
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
                    // 'http://localhost:8000/api/mogu_search/shop/${shopId}',
                    `http://localhost/api/mogu_search/shop/${shopId}`,
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

    return (
        <>
            <div className="mt-4 w-full h-auto flex flex-col sm:flex-row place-items-center sm:h-1/2 ">
                <div className="h-1/2 sm:w-1/2 mb-4 sm:h-full">
                    <ShopMap />
                </div>
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

            <div className="mt-4">
                <h1>販売商品</h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    商品
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    メーカー
                                </th>
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
                                <th scope="col" className="px-6 py-3">
                                    レビュー
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {shopInfo.products &&
                                shopInfo.products.map(product => (
                                    <tr
                                        key={product.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-4">
                                            <a
                                                href={`/product/${product.id}`}
                                                className="flex items-center"
                                            >
                                                <img
                                                    className="w-8 h-8 mr-2"
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
                                            <Button
                                                onClick={() =>
                                                    handleOpen(product.reviews)
                                                }
                                                className=""
                                            >
                                                レビューを見る
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
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
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
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
                    {selectedProductReviews &&
                    selectedProductReviews.length > 0 ? (
                        selectedProductReviews.map(review => (
                            <div
                                key={review.id}
                                className="items-center text-base font-semibold text-gray-900 dark:text-white"
                            >
                                <TotalStar rating={review.rating} />
                                <Typography variant="body2">
                                    {review.description}
                                </Typography>
                            </div>
                        ))
                    ) : (
                        <Typography variant="body2">
                            レビューがありません。
                        </Typography>
                    )}
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

            {/* 商品追加ボタン */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '80px',
                    right: '16px',
                    zIndex: 5,
                }}
            >
                <Tooltip title="商品追加">
                    {/* <Fab
                        style={{
                            background: 'black',
                        }}
                    > */}
                    <Link href={`/map/shop/add_product/${shopId}`}>
                        <AddCircleRoundedIcon
                            color="black"
                            background="white"
                            fontSize="large"
                        ></AddCircleRoundedIcon>
                    </Link>

                    {/* </Fab> */}
                </Tooltip>
            </Box>
            {/* レビュー追加ボタン */}
        </>
    )
}
