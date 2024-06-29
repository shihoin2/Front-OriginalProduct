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
    Button,
    Modal,
    Dialog,
    Typography,
    Rating,
    TextareaAutosize,
    TextField,
} from '@mui/material'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import Link from 'next/link'

export function ShopInfo() {
    const [shopInfo, setShopInfo] = useState([])
    const params = useParams()
    const shopId = params.shopId
    const [productName, setProductName] = useState('')
    console.log(shopId)

    useEffect(() => {
        const getShopInfo = async () => {
            try {
                const response = await axios.get(
                    // 'http://localhost:8000/api/mogu_search/shop/${shopId}',
                    `http://localhost:8000/api/mogu_search/shop/${shopId}`,
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
    return (
        <>
            <h1>店舗名</h1>
            <p>{shopInfo.name}</p>
            <button>お気に入り店舗に追加する</button>
            <h1>住所</h1>
            <p>{shopInfo.address}</p>
            <h1>電話番号</h1>
            <p>{shopInfo.tel}</p>
            <h1>商品</h1>
            {shopInfo.products &&
                shopInfo.products.map(product => (
                    <div key={product.id}>
                        <p>------------</p>
                        <p>{product.image_path}</p>
                        <p>商品名</p>
                        <a href={`/product/${product.id}`}>
                            <p>{product.name}</p>
                        </a>
                        <p>メーカー</p>
                        <p>{product.manufacturer}</p>
                        <p>嚥下グレード</p>
                        <p>学会分類2021</p>
                        <p>{product.JDD2021_code}</p>
                        <p>嚥下食ピラミッド</p>
                        <p>{product.FFPWD_code}</p>
                        {/* <p>特別用途食品</p>
                        <p>{product.manufacturer}</p> */}
                        <p>UDF(ユニバーサルデザインフード)</p>
                        <p>{product.UDF_code}</p>
                        <p>スマイルケア食</p>
                        <p>{product.SCF_code}</p>
                        <p>レビュー</p>
                        {/* <p>{product.reviews_id}</p> */}
                        {product.reviews &&
                            product.reviews.map(review => (
                                <div key={review.id}>
                                    <p>Rating:{review.rating} stars</p>
                                    <p>{review.description}</p>
                                </div>
                            ))}
                    </div>
                ))}

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
