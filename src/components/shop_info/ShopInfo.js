'use client'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export function ShopInfo() {
    const [shopInfo, setShopInfo] = useState([])

    useEffect(() => {
        getShopInfo()
    }, [])

    const getShopInfo = async () => {
        try {
            const response = await axios.get(
                'http://localhost/api/mogu_search/shop/1',
            )
            setShopInfo(response.data)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
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
                        <p>{product.name}</p>
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
                    </div>
                ))}
        </>
    )
}
