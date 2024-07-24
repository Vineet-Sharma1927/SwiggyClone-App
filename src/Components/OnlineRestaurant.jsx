import React, { useState } from 'react'
import RestaurantCard from './RestaurantCard'
import Cross from '../assets/cross.svg'
import { useDispatch } from 'react-redux'
import { setfilterValue } from '../utils/filterSlice'

function OnlineRestaurant({ data , title}) {
    const filterOption = [" Ratings 4.0+ "," Rs.300-Rs.600 "," Less than Rs.300 "," offers "]

    const [activeBtn, setactiveBtn] = useState(null)

    const dispatch = useDispatch()

    function handelfilter(filterName){
        setactiveBtn(activeBtn === filterName ? null:filterName)
    }

    dispatch(setfilterValue(activeBtn))

    return (
        <>
        <h1 className='text-lg md:text-2xl font-bold mt-7 md:mt-12'>{title}</h1>
        <div className='flex gap-2'>
            {
                filterOption.map((filterName,i) =>(
                    < div  key={i}>
                        <button onClick={()=>handelfilter(filterName)} className={'border border-gray-300 shadow-md  px-1.5 md:px-4 py-2.5 md:py-1 mb-2 mt-3  rounded-full text-[10px] md:text-lg flex  items-center gap-0 md:gap-3 hover:scale-110 duration-100' + (activeBtn === filterName ? "active":"")}>
                            <p>{filterName}</p>
                            <img className='hidden w-5' src={Cross} alt="" />
                        </button>
                    </div>
                ))
            }
        </div>
        <div className=' flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-10 mt-5 '>
            {
                data.map(({ info ,cta:{link}}, i) => (
                    <div key={i} className='hover:scale-90 duration-200 '>
                        <RestaurantCard {...info} link={link} />  {/*we are writing {...info} here we can also write it as info = {info} as we write in body.jsx  to pass the data but we write it because now we can add anything in the info object easly */}
                    </div>
                ))
            }
        </div>
        </>
    )
}

export default OnlineRestaurant
