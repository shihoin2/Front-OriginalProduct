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
                    `https://osyokuzi.site/api/mogu_search/shop/${shopId}`,
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

            {/* <h1>店舗名</h1>
            <p>{shopInfo.name}</p>
            <button>お気に入り店舗に追加する</button>
            <h1>住所</h1>
            <p>{shopInfo.address}</p>
            <h1>電話番号</h1>
            <p>{shopInfo.tel}</p> */}
            <div className="mt-4">
                <h1>販売商品</h1>
                <div className="">
                    <ul className="flex flex-wrap items-center justify-center w-full">
                        <li>
                            <a
                                href="#"
                                className="me-4 hover:underline md:me-6 "
                            >
                                商品
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="me-4 hover:underline md:me-6"
                            >
                                メーカー
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="me-4 hover:underline md:me-6 "
                            >
                                学会分類2021
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="me-4 hover:underline md:me-6"
                            >
                                嚥下食ピラミッド
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="me-4 hover:underline md:me-6"
                            >
                                UDF(ユニバーサルデザインフード)
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="me-4 hover:underline md:me-6"
                            >
                                スマイルケア食
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="me-4 hover:underline md:me-6"
                            >
                                レビュー
                            </a>
                        </li>
                    </ul>

                    {shopInfo.products &&
                        shopInfo.products.map(product => (
                            // <div key={product.id}>
                            <>
                                <ul className="flex flex-wrap grid-cols-7 items-center justify-center text-gray-900 dark:text-white w-full">
                                    <li
                                        key={product.id}
                                        className="flex flex-auto me-4 hover:underline md:me-6"
                                    >
                                        {/* <div className="flex-row"> */}
                                        <a href={`/product/${product.id}`}>
                                            <img
                                                className="w-8 h-8 "
                                                src={product.image_path}
                                                alt={product.name}
                                            />
                                            <p>{product.name}</p>
                                        </a>
                                        {/* </div> */}
                                    </li>
                                    <li className="flex-1 me-4 hover:underline md:me-6">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {product.manufacturer}
                                        </p>
                                    </li>

                                    <li className="flex-1 me-4 hover:underline md:me-6">
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {product.JDD2021_code}
                                        </p>
                                    </li>

                                    <li className="flex-1 me-4 hover:underline md:me-6">
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {product.FFPWD_code}
                                        </p>
                                    </li>
                                    <li className="flex-1 me-4 hover:underline md:me-6">
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {product.UDF_code}
                                        </p>
                                    </li>
                                    <li className="flex-1 me-4 hover:underline md:me-6">
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {product.SCF_code}
                                        </p>
                                    </li>
                                    <li className="flex-1 me-4 hover:underline md:me-6">
                                        <Button
                                            // variant="contained"
                                            // color="primary"
                                            onClick={() =>
                                                handleOpen(product.reviews)
                                            }
                                            className=""
                                        >
                                            レビューを見る
                                        </Button>
                                    </li>
                                </ul>
                            </>
                            // </div>
                        ))}
                </div>
            </div>
            {/* レビューモーダル */}
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
                                className=" items-center text-base font-semibold text-gray-900 dark:text-white"
                            >
                                {/* <TotalStar value={review.rating} readOnly /> */}
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
