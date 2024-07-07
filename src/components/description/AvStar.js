import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa6'

const AvStar = ({ averageRating, totalReviews, onClick }) => {
    return (
        <div className="flex items-center">
            <FaStar color="red" />
            <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                {averageRating}
            </p>
            {/* <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" /> */}
            <p
                // href="#"
                onClick={onClick}
                className="cursor-pointer ml-2 text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
            >
                ({totalReviews}件)
            </p>
        </div>
    )
}

export default AvStar
