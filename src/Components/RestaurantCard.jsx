import React from 'react'
import { Link } from 'react-router-dom'

import Rating from '../assets/Rating.svg'
function RestaurantCard(info) {
    return (
        <Link to={`/RestaurantMenu/${info?.link.split("/")[4]}`}>
            <div className='relative min-w-[200px] md:min-w-[273px] h-[160px] md:h-[182px] cursor-pointer'>
                <img className='w-full h-full rounded-2xl object-cover' src={`https://media-assets.swiggy.com/swiggy/image/upload/${info?.cloudinaryImageId}`} alt="" />
                <div className='bg-gradient-to-t from-black from-3% to-transparent to-50% rounded-2xl  w-full h-full absolute top-0 text-white text-md md:text-xl font-bold'>
                    <p className='absolute bottom-0 pl-3 pb-3 '>{info?.aggregatedDiscountInfoV3?.header} {info?.aggregatedDiscountInfoV3?.subHeader}</p>
                </div>
            </div>
            <div className='mt-2'>
                <h1 className='font-bold  text-gray-700 text-md md:text-lg '>{info?.name}</h1>
                <div className='text-gray-700 text-sm font-bold flex gap-1 md:gap-0'>
                    <img src={Rating} alt="" />
                    <p>{info?.avgRating} • {info?.sla?.slaString}</p>
                </div>
                <p className='line-clamp-1 text-gray-600 text-sm md:text-md'>{info?.cuisines.join(", ")}</p>
                <p className='text-gray-600 text-sm md:text-md'>{info?.locality}</p>
            </div>
        </Link>
    )
}

export default RestaurantCard
