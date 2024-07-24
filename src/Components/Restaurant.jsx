import React from 'react'
import Rating from '../assets/Rating.svg'
import { Link } from 'react-router-dom'

function RestaurantData({ data: { card: {
  card: {
    info: { id, cloudinaryImageId, aggregatedDiscountInfoV3 = {},
      costForTwoMessage, cuisines, promoted = false, name, avgRating, sla: { slaString } },
  }
}
} }) {
  return (
    <div className='flex flex-wrap gap-3 md:gap-5'>
      <Link to={`/RestaurantMenu/${id}`}>
        <div className='w-full md:w-[403px] h-[130px] md:h-[140px] border rounded-3xl p-4 bg-white'>
          <div className='flex gap-2 md:gap-0 items-center relative'>
            <div className='w-[30%]'>
              <img className='w-[77px] md:w-[88px] h-[96px] rounded-xl ' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,c_fit/${cloudinaryImageId}`} alt="" />
            </div>
            <div className='w-[70%]' >
              <h1 className='text-[12px] md:text-lg font-semibold'>{name}</h1>
              <p className='text-gray-500 text-[10px] md:text-[14px] flex gap-2 md:gap-3 mt-1 mb-1'><img className='w-3 md:w-4 ' src={Rating} alt="" /><span>{avgRating}</span><span>{slaString}</span><span>{costForTwoMessage}</span></p>
              <p className='text-[10px] md:text-sm text-gray-500 line-clamp-1'>{cuisines.join(", ")}</p>
              <div className='bg-white w-[82px] absolute text-orange-500  flex items-center left-1 justify-center rounded shadow-lg bottom-0 flex-col'>
                <h1 className='text-[13px] font-extrabold'>{aggregatedDiscountInfoV3?.header}</h1>
                <p className='text-[9px]'>{aggregatedDiscountInfoV3?.subHeader}</p>
              </div>
              {
                promoted === true ? <div className='bg-gray-700 rounded-sm absolute top-0 left-0 bg-opacity-100 text-white w-[16px] md:w-[21px] text-[11px] md:text-[14px] '>Ad</div> : ""
              }
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default RestaurantData
