import React from 'react'
import { useState } from 'react'
import leftArrow from '../assets/leftArrow.svg'
import rightArrow from '../assets/rightArrow.svg'

function Onyourmind({data}) {

    const [value, setvalue] = useState(0)

    // console.log(value);
    function handelPrev() {
        value <= 0 ? "" : setvalue((prev) => prev - 47)
    }
    function handelNext() {
        value >= 235 ? "" : setvalue((next) => next + 47)
    }

    return (
        <div>
            <div className='font-bold mt-2  flex justify-between items-center gap-2'>
                <h1 className='text-lg md:text-2xl'>What's on your mind?</h1>
                <div className='flex gap-2'>
                    <div onClick={handelPrev} className={`border rounded-full p-2 cursor-pointer w-9 md:w-full ` + (value <= 0 ? "bg-gray-200" : "bg-gray-400")} ><img src={leftArrow} alt="" /></div>
                    <div onClick={handelNext} className={`border rounded-full p-2 cursor-pointer w-9 md:w-full  ` + (value >= 250 ? "bg-gray-200" : "bg-gray-400")}><img src={rightArrow} alt="" /></div>
                </div>
            </div>
            <div style={{ translate: `-${value}%` }} className='flex duration-500 gap-2 md:gap-3 '>
                {
                    data.map((item, i) => (
                        <img key={i} className='w-24 md:w-40 cursor-pointer mt-3' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`} alt="" />
                    ))
                }
            </div>
            <hr className='border mt-5 md:mt-10' />
        </div>
    )
}

export default Onyourmind
