import React, { Component } from 'react'
import Slider from 'react-slick'
import { IoIosArrowDropleft } from 'react-icons/io'
import { IconContext } from 'react-icons'

const PrevArrow = ({ prev_arrow, onClick }) => {
    return (
        <div className={prev_arrow} onClick={onClick}>
            <IoIosArrowDropleft size="2rem" />
        </div>
    )
}

export default PrevArrow
