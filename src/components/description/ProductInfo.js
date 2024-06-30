'use client'
import TotalStar from './TotalStar'
import useCsrfToken from '@/hooks/useCsrfToken'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import StarRating from '../storeProduct/StarRating'
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
} from '@mui/material'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'

export function ProductInfo() {
    const [productInfo, setProductInfo] = useState([])
    const params = useParams()
    const productId = params.productId
    const [open, setOpen] = useState(false)
    const [rateStar, setRateStar] = useState()
    const [review, setReview] = useState('')
    // console.log(rateStar)
    const csrfToken = useCsrfToken()

    useEffect(() => {
        getProductInfo()
    }, [])

    const getProductInfo = async () => {
        try {
            const response = await axios.get(
                `https://osyokuzi.site/api/mogu_search/product/${productId}`,
            )
            setProductInfo(response.data)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleReviewChange = e => {
        setReview(e.target.value)
        console.log(review)
    }

    const handleRateChange = newRate => {
        setRateStar(newRate)
        console.log(newRate)
    }

    const isDisabled = rateStar === 0 || !review.trim()

    const handleReviewAdd = async () => {
        console.log('Submitting review:', {
            content: review,
            rating: rateStar,
            product_id: productId,
        })
        try {
            const response = await axios.post(
                // `http://127.0.0.1:8000/api/mogu_search/reviews`,
                `https://osyokuzi.site/api/mogu_search/reviews`,
                // `http://localhost:8000/api/mogu_search/reviews/${productId}`,
                {
                    content: review,
                    rating: rateStar,
                    product_id: productId,
                },
                {
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                },
            )
            //     setProductInfo(prev => ({
            //         ...prev,
            //         reviews: [...prev.reviews, response.data],
            //     }))
            //     setOpen(false)
            // } catch (err) {
            //     console.error('Error response:', err.response)
            // }

            //     )
            setProductInfo(response.data)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <p>
                <img
                    src={productInfo.image_path}
                    alt="Product Image"
                    className="product_image"
                />
            </p>
            <p>{productInfo.name}</p>
            <p>メーカー</p>
            <p>{productInfo.manufacturer}</p>
            <p>嚥下グレード</p>
            {productInfo.JDD2021_code && (
                <>
                    <p>学会分類2021</p>
                    <p>{productInfo.JDD2021_code}</p>
                </>
            )}
            {productInfo.FFPWD_code && (
                <>
                    <p>嚥下食ピラミッド</p>
                    <p>{productInfo.FFPWD_code}</p>
                </>
            )}
            {productInfo.UDF_code && (
                <>
                    <p>UDF(ユニバーサルデザインフード)</p>
                    <p>{productInfo.UDF_code}</p>
                </>
            )}
            {productInfo.SCF_code && (
                <>
                    <p>スマイルケア食</p>
                    <p>{productInfo.SCF_code}</p>
                </>
            )}

            {/* <p>特別用途食品</p>
            <p>{productInfo.manufacturer}</p> */}

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
            {/* レビュー追加ボタン */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '80px',
                    right: '16px',
                    zIndex: 5,
                }}
            >
                <Tooltip title="レビュー追加">
                    {/* <Fab
                        style={{
                            background: 'black',
                        }}
                    > */}
                    <AddCircleRoundedIcon
                        color="black"
                        background="white"
                        fontSize="large"
                        onClick={handleOpen}
                    ></AddCircleRoundedIcon>

                    {/* </Fab> */}
                </Tooltip>
            </Box>
            {/* レビュー追加ボタン */}
            {/* モーダル*/}
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid, #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography>商品のレビューを書く</Typography>
                    {/* <Rating
                        required
                        onChange={handleRatingChange}
                        defaultValue={0}
                        value={rating}
                        name="simple-controlled"
                        max={5}
                    /> */}
                    <StarRating onRateChange={handleRateChange} />
                    <TextareaAutosize
                        required
                        minRows={5}
                        placeholder="レビューを記入してください"
                        onChange={handleReviewChange}
                        // value={review}
                        style={{
                            width: '100%',
                            marginTop: '10px',
                        }}
                    />
                    <Button
                        variant="outlined"
                        disabled={isDisabled}
                        onClick={handleReviewAdd}
                    >
                        送信
                    </Button>
                </Box>
            </Modal>
            {/* モーダル*/}
        </>
    )
}
