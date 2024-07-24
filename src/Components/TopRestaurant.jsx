import React from 'react'
import { useState, useEffect } from 'react'
import leftArrow from '../assets/leftArrow.svg'
import rightArrow from '../assets/rightArrow.svg'
import RestaurantCard from './RestaurantCard'

function TopRestaurant({ data , title }) {

    const [value, setvalue] = useState(0)

    // console.log(value);

    function handelPrev() {
        value <= 0 ? "" : setvalue((prev) => prev - 47)
    }
    function handelNext() {
        value >= 517 ? "" : setvalue((next) => next + 47)
    }
    return (
        <div className='mt-6 md:mt-12'>
            <div className='font-bold  gap-2 flex justify-between items-center'>
                <h1 className='text-lg md:text-2xl '>{title}</h1>
                <div className='flex gap-2'>
                    <div onClick={handelPrev} className={`border rounded-full p-2 cursor-pointer w-9 md:w-full  ` + (value <= 0 ? "bg-gray-200" : "bg-gray-400")} ><img src={leftArrow} alt="" /></div>
                    <div onClick={handelNext} className={`border rounded-full p-2 cursor-pointer w-9 md:w-full ` + (value >= 517 ? "bg-gray-200" : "bg-gray-400")}><img src={rightArrow} alt="" /></div>
                </div>
            </div>
            <div style={{ translate: `-${value}%` }} className='flex duration-500 gap-4 md:gap-9 mt-3 '>
            {
                data.map(({ info ,cta:{link}}, i) => (
                    <div key={i} className='hover:scale-90 duration-200 '>
                        <RestaurantCard {...info} link={link} />  {/*we are writing {...info} here we can also write it as info = {info} as we write in body.jsx  to pass the data but we write it because now we can add anything in the info object easly */}
                    </div>
                ))
            }
            </div>
            <hr className='border mt-4 md:mt-10' />
        </div>
    )
}

export default TopRestaurant


