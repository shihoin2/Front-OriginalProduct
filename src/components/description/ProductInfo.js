'use client'
import TotalStar from './TotalStar'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export function ProductInfo() {
    const [productInfo, setProductInfo] = useState([])

    useEffect(() => {
        getProductInfo()
    }, [])

    const getProductInfo = async () => {
        try {
            const response = await axios.get(
                'http://localhost/api/mogu_search/product/1',
            )
            setProductInfo(response.data)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <p>{productInfo.name}</p>
            <p>{productInfo.address}</p>
            <h1>メーカー</h1>
            <p>{productInfo.tel}</p>
            <p>メーカー</p>
            <p>{productInfo.manufacturer}</p>
            <p>嚥下グレード</p>
            <p>学会分類2021</p>
            <p>{productInfo.JDD2021_code}</p>
            <p>嚥下食ピラミッド</p>
            <p>{productInfo.FFPWD_code}</p>
            {/* <p>特別用途食品</p>
            <p>{productInfo.manufacturer}</p> */}
            <p>UDF(ユニバーサルデザインフード)</p>
            <p>{productInfo.UDF_code}</p>
            <p>スマイルケア食</p>
            <p>{productInfo.SCF_code}</p>
            <p>レビュー</p>
            {productInfo.reviews &&
                productInfo.reviews.map(review => (
                    <>
                        <p>{review.user.name}</p>
                        <TotalStar rating={review.rating} />
                        <p>{review.rating}</p>
                        <p>{review.description}</p>
                    </>
                ))}
        </>
    )
}
