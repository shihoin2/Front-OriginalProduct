'use client'
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
import TotalStar from '@/components/description/TotalStar'
import AvStar from '@/components/description/AvStar'
import { BiCommentAdd } from 'react-icons/bi'

export function ProductInfo() {
    const [productInfo, setProductInfo] = useState([])
    const params = useParams()
    const productId = params.productId
    const [addReviewOpen, setAddReviewOpen] = useState(false)
    const [checkReviewOpen, setCheckReviewOpen] = useState(false)
    const [rateStar, setRateStar] = useState(0)
    const [review, setReview] = useState('')
    const [selectedProductReviews, setSelectedProductReviews] = useState([])
    // console.log(rateStar)
    const csrfToken = useCsrfToken()

    useEffect(() => {
        getProductInfo()
    }, [])

    const getProductInfo = async () => {
        try {
            const response = await axios.get(
                `http://localhost/api/mogu_search/product/${productId}`,
            )
            setProductInfo(response.data)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
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
                `http://localhost/api/mogu_search/reviews`,

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
            await getProductInfo()
            //         setProductInfo(response.data)
            //         console.log(response.data)
            //     } catch (err) {
            //         console.log(err)
            //     }
            // }
            console.log('Product info after review:', productInfo)
        } catch (err) {
            console.error('Error submitting review:', err)
        }
    }

    // const calculateAverageRating = () => {
    //     if (!productInfo.reviews || productInfo.reviews.length === 0) {
    //         return 0
    //     }

    //     const totalReviews = productInfo.reviews.length
    //     const sumRatings = productInfo.reviews.reduce(
    //         (sum, review) => sum + review.rating,
    //         0,
    //     )
    //     const averageRating = sumRatings / totalReviews
    //     return averageRating.toFixed(1)
    // }
    const calculateAverageRating = () => {
        if (!productInfo.reviews || productInfo.reviews.length === 0) {
            return 0
        }

        const totalReviews = productInfo.reviews.length
        const sumRatings = productInfo.reviews.reduce(
            (sum, review) => sum + review.rating,
            0,
        )
        const averageRating = sumRatings / totalReviews
        return averageRating.toFixed(1)
    }

    const handleAddReviewOpen = () => {
        setAddReviewOpen(true)
    }
    const handleAddModalClose = () => {
        setAddReviewOpen(false)
    }

    const handleCheckReviewOpen = () => {
        setSelectedProductReviews(productInfo.reviews || [])
        setCheckReviewOpen(true)
    }
    const handleCheckReviewClose = () => {
        setCheckReviewOpen(false)
    }

    return (
        <>
            <div className="mt-4 w-full h-auto flex flex-col sm:flex-row place-items-center sm:h-1/2 ">
                <div className="h-1/2 sm:w-1/2 mb-4 sm:h-full">
                    <img
                        src={productInfo.image_path}
                        alt="Product Image"
                        className="product_image"
                    />
                </div>

                <div className="h-1/2  relative overflow-x-auto  sm:rounded-lg sm:w-1/2">
                    <table className=" text-sm text-left rtl:text-right">
                        <tbody>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap bg-[#F7F7F7]"
                                >
                                    商品名
                                </th>
                                <td className="px-6 py-4">
                                    {productInfo.name}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap bg-[#F7F7F7]"
                                >
                                    メーカー
                                </th>
                                <td className="px-6 py-4">
                                    {productInfo.manufacturer}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th
                                    rowSpan={4}
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap bg-[#F7F7F7]"
                                >
                                    嚥下グレード
                                </th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap bg-[#F7F7F7]"
                                >
                                    学会分類2021
                                </th>
                                <td className="px-6 py-4">
                                    {productInfo.JDD2021_code && (
                                        <>
                                            <p>{productInfo.JDD2021_code}</p>
                                        </>
                                    )}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap bg-[#F7F7F7]"
                                >
                                    嚥下食ピラミッド
                                </th>

                                <td>
                                    {productInfo.FFPWD_code && (
                                        <>
                                            <p>{productInfo.FFPWD_code}</p>
                                        </>
                                    )}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap bg-[#F7F7F7]"
                                >
                                    UDF(ユニバーサルデザインフード)
                                </th>

                                <td>
                                    {productInfo.UDF_code && (
                                        <>
                                            <p>{productInfo.UDF_code}</p>
                                        </>
                                    )}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap bg-[#F7F7F7]"
                                >
                                    スマイルケア食
                                </th>

                                <td>
                                    {productInfo.SCF_code && (
                                        <>
                                            <p>{productInfo.SCF_code}</p>
                                        </>
                                    )}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap bg-[#F7F7F7]"
                                >
                                    レビュー
                                </th>

                                <td
                                    colSpan={2}
                                    className="space-x-4 bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <div className="flex space-x-5 ml-4">
                                        <AvStar
                                            averageRating={calculateAverageRating()}
                                            totalReviews={
                                                productInfo.reviews
                                                    ? productInfo.reviews.length
                                                    : 0
                                            }
                                            onClick={() =>
                                                handleCheckReviewOpen(
                                                    productInfo.reviews,
                                                )
                                            }
                                        />
                                        {/* <AvStar
                                            averageRating={calculateAverageRating()}
                                            totalReviews={
                                                productInfo.reviews.length
                                            }
                                            onClick={() => handleOpen(review)}
                                        /> */}
                                        <BiCommentAdd
                                            color="gray"
                                            onClick={handleAddReviewOpen}
                                            size={20}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* <p>特別用途食品</p>
            <p>{productInfo.manufacturer}</p> */}

            {/* モーダル*/}
            <Modal open={addReviewOpen} onClose={handleAddModalClose}>
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

            {/* レビューを見るモーダル */}
            <Modal open={checkReviewOpen} onClose={handleCheckReviewClose}>
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

            {/* レビューを見るモーダル */}
        </>
    )
}
