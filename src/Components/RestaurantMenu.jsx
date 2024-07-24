import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Rating from '../assets/Rating.svg'
import leftArrow from '../assets/leftArrow.svg'
import rightArrow from '../assets/rightArrow.svg'
import search from '../assets/search.svg'
import MenuCard from './MenuCard'
import { Coordinates, ResInformation } from '../context/contextApi'
import MenuShimmer from './MenuShimmer'

function RestaurantMenu() {
    const { id } = useParams()  // In this we are passing the whole url with address so to get only the id we make a another variable and apply split operation in it and we need to get last index so we use 'at' and put it in MainId 
    const MainId = id.split("-").at(-1)

    const { ResInfo, setResInfo } = useContext(ResInformation)
    const [DiscountData, setDiscountData] = useState([])
    const [MenuData, setMenuData] = useState([])
    const [TopPicks, setTopPicks] = useState(null)
    const [value, setvalue] = useState(0)
    const { coor: { lat, lng } } = useContext(Coordinates)

    // const [currIndex, setcurrIndex] = useState(0)  // this is used for dependent drop down functionality 

    // console.log(MenuData);

    async function fetchMenu() {
        let req = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${MainId}&catalog_qa=undefined&submitAction=ENTER`)
        let res = await req.json();
        // console.log(res);

        let resInfo = res?.data?.cards.find((data)=>data?.card?.card?.["@type"].includes("food.v2.Restaurant"))?.card?.card?.info
        setResInfo(resInfo);

        let discountData = res?.data?.cards.find((data)=>data?.card?.card?.["@type"].includes("v2.GridWidget"))?.card?.card?.gridElements?.infoWithStyle?.offers
        setDiscountData(discountData);

        let ActualMenu = (res?.data?.cards.find((data)=>data?.groupedCard))

        setMenuData(ActualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(data => data?.card?.card?.itemCards || data?.card?.card?.categories));

        setTopPicks(ActualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(data => data?.card?.card?.title == "Top Picks")[0]);
    }


    useEffect(() => {
        fetchMenu()
    }, [])

    function handelPrev() {
        value <= 0 ? "" : setvalue((prev) => prev - 40)
    }
    function handelNext() {
        value >= 100 ? "" : setvalue((next) => next + 40)
    }

    // function togglefunc(i) {
    //     setcurrIndex(i === currIndex ? null : i)
    // }   // There are two types of drop down one is independent and one is dependent so this is exapmle of dependent drop down only one card open at a time 


    return (
        <div className='w-full'>
            {
                MenuData.length ? 
                (<div className='w-[300px] md:w-[800px] mx-auto mt-7 relative bottom-3' >
                    <div>   {/*This div is for ResInfo */}
                        <div>
                            <p className='text-[11px]'><Link to={'/'}><span className='text-gray-400 hover:text-black duration-75 cursor-pointer'>Home /</span></Link>  <span className='text-gray-400 hover:text-black duration-75 cursor-pointer'>{ResInfo.city} /</span> <span className='text-gray-600 font-semibold font'>{ResInfo.name}</span></p>
                            <h1 className='text-xl md:text-2xl font-bold pl-3 mt-4 md:mt-10'>{ResInfo.name}</h1>
                        </div>
                        <div className=' bg-gradient-to-t from-gray-400/40 from-10% to-transparent to-90% p-3 md:p-4 rounded-b-3xl'>
                            <div className='border rounded-3xl p-2 md:p-4 bg-white'>
                                <h1 className='font-bold flex items-center gap-1 text-sm md:text-lg'><span><img src={Rating} alt="" /></span> <span>{ResInfo?.avgRating} ({ResInfo?.totalRatingsString}) • {ResInfo?.costForTwoMessage
                                }</span></h1>
                                <p className='text-orange-600 font-bold underline text-[12px] md:text-[15px] mt-1 pl-1 line-clamp-1'>{ResInfo?.cuisines?.join(", ")}</p>
                                <div className=' flex items-center gap-3'>
                                    <div className='w-[9px] mt-4 flex flex-col items-center'>
                                        <div className='w-[7px] h-[7px] bg-gray-300 rounded-full'></div>
                                        <div className='w-[1px] h-[25px] bg-gray-300'></div>
                                        <div className='w-[7px] h-[7px] bg-gray-300 rounded-full'></div>
                                    </div>
                                    <div>
                                        <p className='font-bold mt-3 text-[12px] md:text-sm'>Outlet <span className='text-gray-800 font-thin pl-3'>{ResInfo?.locality}</span></p>
                                        <p className='font-bold text-[12px] md:text-sm mt-2'>{ResInfo?.sla?.slaString}</p>
                                    </div>
                                </div>
    
                                <hr className='mt-5 mb-3' />
                                <p className='flex items-center gap-2 text-gray-500 font-bold text-[12px] md:text-sm'><span><img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_23,h_23/${ResInfo?.feeDetails?.icon}`} alt="" /></span><span>{ResInfo?.expectationNotifiers?.map((data) => (data.enrichedText.replace(/<[^>]*>/g, "")))}</span></p>
                            </div>
                        </div>
                    </div>
    
    
                    <div className='overflow-hidden'> {/*This div is for Discount section  */}
                        <div className='font-bold  flex justify-between items-center mt-7'>
                            <h1 className='text-lg md:text-xl'>Deals for you</h1>
                            <div className='flex gap-2'>
                                <div onClick={handelPrev} className={`border rounded-full p-2 cursor-pointer w-9 md:w-full  ` + (value <= 0 ? "bg-gray-200" : "bg-gray-400")} ><img src={leftArrow} alt="" /></div>
                                <div onClick={handelNext} className={`border rounded-full p-2 cursor-pointer w-9 md:w-full ` + (value >= 200 ? "bg-gray-200" : "bg-gray-400")}><img src={rightArrow} alt="" /></div>
                            </div>
                        </div>
                        <div style={{ translate: `-${value}%` }} className='flex duration-500 gap-3 '>
                            {
    
                                DiscountData.map(({ info: { header, offerLogo, couponCode } }, i) => (
                                    // console.log(header)
                                    <div key={i} className='border rounded-3xl p-2 md:p-3 flex gap-2.5 md:gap-4 text-[13px] md:text-[17px] min-w-[260px] md:min-w-[328px] h-[76px] items-center mt-3 '>
                                        <img className='w-10 md:w-12' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${offerLogo}`} alt="" />
                                        <div>
                                            <h2 className='font-extrabold '>{header}</h2>
                                            <p className='text-slate-600 text-sm'>{couponCode}</p>
                                        </div>
                                    </div>
                                ))
    
                            }
                        </div>
                    </div>
    
                    <div>    {/*this div is for search bar and  top Picks section  */}
                        {/* Search Bar */}
                        <h2 className='flex gap-4 justify-center items-center mt-5 md:mt-8 text-slate-600'>MENU</h2>
    
    
                        <Link to={"/Search"}>
                        <div className='w-full  flex justify-center items-center bg-gray-300 p-1.5 md:p-3 mt-4 rounded-xl text-gray-700 font-semibold relative cursor-pointer'>
                            <div className=''>Search for Dishes</div>
                            <img className=' absolute  right-5 w-4 md:w-5' src={search} alt="" />
                        </div>
                        </Link>
    
                        <hr className=' mt-10 border' />
    
                        {/* Top Picks Section */}
    
                        {
                            TopPicks &&
                            <div className='overflow-hidden'>
                                <div className='font-bold  flex justify-between items-center mt-7'>
                                    <h1 className='text-lg md:text-xl'>Top Picks</h1>
                                    <div className='flex gap-2'>
                                        <div onClick={handelPrev} className={`border rounded-full p-2 cursor-pointer w-9 md:w-full   ` + (value <= 0 ? "bg-gray-200" : "bg-gray-400")} ><img src={leftArrow} alt="" /></div>
                                        <div onClick={handelNext} className={`border rounded-full p-2 cursor-pointer w-9 md:w-full  ` + (value >= 200 ? "bg-gray-200" : "bg-gray-400")}><img src={rightArrow} alt="" /></div>
                                    </div>
                                </div>
                                <div style={{ translate: `-${value}%` }} className='flex duration-500 gap-4 md:gap-7 p-2'>
                                    {
                                        TopPicks?.card?.card?.carousel.map(({ creativeId, dish: { info: { defaultPrice, price } } }, i) => (
                                            <div key={i} className='relative'>
                                                <img className='min-w-[240px] md:min-w-[273px] h-[250px] md:h-[281px]' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${creativeId}`} alt="" />
                                                <div className='flex justify-between items-center absolute bottom-7  w-full px-4'>
                                                    <h2 className='text-white font-bold'>₹{defaultPrice / 100 || price / 100}</h2>
                                                    <button className='border rounded-lg text-lg md:text-xl font-extrabold text-green-700 py-1 px-6 md:px-9 bg-white  drop-shadow '>ADD</button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <hr className='border-[12px] border-gray-200 mt-7' />
                            </div>
                        }
                    </div>
    
    
                    <div>   {/*This div is for Menu Section */}
                        <div className='mt-8'>
                            {
                                MenuData.map(({ card: { card } }, i) => (
                                    <MenuCard key={i} card={card} />
                                ))
                            }
                        </div>
                    </div>
    
                </div>) 
                : (<MenuShimmer/>)
            }
            

        </div>
    )
}

export default RestaurantMenu
