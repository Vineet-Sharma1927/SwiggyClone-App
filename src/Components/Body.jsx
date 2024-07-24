import React, { useState, useEffect, useContext } from 'react'
import Onyourmind from './Onyourmind'
import TopRestaurant from './TopRestaurant'
import OnlineRestaurant from './OnlineRestaurant'
import { Coordinates } from '../context/contextApi'
import { useSelector } from 'react-redux'
import Swiggy from '../assets/SwiggyLogo.svg'
import Shimmer from './Shimmer'

function Body() {

  const [RestaurantCardData, setRestaurantCardData] = useState([])
  const [OnYourMindData, setOnYourMindData] = useState([])
  const [TopTitle, setTopTitle] = useState("")
  const [OnlineTitle, setOnlineTitle] = useState("")
  const [data, setdata] = useState({})
  const { coor: { lat, lng } } = useContext(Coordinates)

  async function fetchData() {
    const data = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
    const result = await data.json();
    setdata(result?.data)
    setTopTitle(result?.data?.cards[1]?.card?.card?.header?.title)
    setOnlineTitle(result?.data?.cards[2]?.card?.card?.title)

    let mainData = result?.data?.cards.find((data)=>data?.card?.card?.id == "top_brands_for_you")?.card?.card?.gridElements?.infoWithStyle?.restaurants
    
    let mainData2 = result?.data?.cards.find((data)=>data?.card?.card?.id == "restaurant_grid_listing")?.card?.card?.gridElements?.infoWithStyle?.restaurants

    setRestaurantCardData(mainData || mainData2)

    let Data  = result?.data?.cards.find((data)=>data?.card?.card?.id == "whats_on_your_mind")?.card?.card?.imageGridCards?.info
    setOnYourMindData(Data)
  }

  useEffect(() => {
    fetchData()
  }, [lat, lng])

  let filterVal = useSelector((state => state.filterSlice.filterVal))

  const filteredData = RestaurantCardData.filter(item => {
    if (!filterVal) return true

    switch (filterVal) {
      case " Ratings 4.0+ ": return item?.info?.avgRating > 4
      case " Rs.300-Rs.600 ": return item?.info?.costForTwo?.slice(1, 4) >= "300" && item?.info?.costForTwo?.slice(1, 4) <= "600"
      case " Less than Rs.300 ": return item?.info?.costForTwo?.slice(1, 4) < "300"
      case " offers ": return item?.info?.aggregatedDiscountInfoV3?.header
      default: return true
    }
  })

  if (data.communication) {
    return (
      <div className='flex flex-col justify-center items-center h-full w-full mt-[9%]'>
        <img className='w-60 ' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" alt="" />
        <h1 className='mt-5 font-bold text-xl '>Location Unserviceable</h1>
        <p className='text-gray-500 w-[26%] text-center'>We don’t have any services here till now. Try changing location.</p>
      </div>
    )
  }

  return (
    <div className='w-full pt-2 h-[100vh] bg-slate-50'>
      {
        RestaurantCardData.length ? 
        ( <>
          <div className='w-full pl-2 pr-2 md:w-[75%]  overflow-hidden mx-auto' >

            {OnYourMindData ? 
              <>
              <Onyourmind data={OnYourMindData} />
              <TopRestaurant data={RestaurantCardData} title={TopTitle} />
              </>:""
            }
            
            <OnlineRestaurant data={filterVal ? filteredData : RestaurantCardData} title={OnlineTitle} />
    
          </div>
          <div className='bg-gray-800 h-8 md:h-10 w-full flex gap-3 items-center justify-center text-[13px] md:text-lg rounded-t-lg text-yellow-400 mt-3 shadow-lg'>
          <span className='w-5'><img src={Swiggy} alt="" /></span>
          <span>Swiggy © 2024 Bundl Technologies Pvt. Ltd</span>
        </div>
      </>
      ) : (<Shimmer/>)
      }
      
      
    </div>
  )
}

export default Body
