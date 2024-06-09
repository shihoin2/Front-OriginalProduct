import React, { Component } from 'react'
import Slider from 'react-slick'
import { IoIosArrowDropright } from 'react-icons/io'
import { IconContext } from 'react-icons'

const NextArrow = ({ next_arrow, onClick }) => {
    return (
        <div className={next_arrow} onClick={onClick}>
            <IoIosArrowDropright size="2rem" />
        </div>
    )
}

export default NextArrow
