import React, { useContext, useEffect, useState } from 'react'
import DishesData from './Dishes'
import RestaurantData from './Restaurant'
import { Coordinates } from '../context/contextApi'
import { useDispatch, useSelector } from 'react-redux'
import { resetSimilarResDish } from '../utils/toogleslice'

function Search() {

    const filterOption = [" Restaurant", "Dishes"]

    const [activeBtn, setactiveBtn] = useState("Dishes")
    const [dataQuery, setdataQuery] = useState('')
    const [Dishes, setDishes] = useState([])
    const [Restaurant, setRestaurant] = useState([])
    const [selectedResDish, setselectedResDish] = useState(null)
    const [SimilarResDishes, setSimilarResDishes] = useState([])
    const { coor: { lat, lng } } = useContext(Coordinates)

    const {IsSimResDishes,city,resLocation,resId,itemId} = useSelector((state) => state.toogleslice.SimilarResDishes)
    // console.log(IsSimResDishes);
    const dispatch = useDispatch()

    function handelfilter(filterName) {
        setactiveBtn(activeBtn === filterName ? activeBtn : filterName)
    }

    async function fetchDishData() {
        let data = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${dataQuery}&trackingId=922d8583-b92f-ceb7-167c-fe3bec6b0392&submitAction=ENTER&queryUniqueId=680347df-b83e-f76a-cafb-b0f6b149167d`)
        let res = await data.json()

        let filtereddata = ((res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter((data) => data?.card?.card?.info))
        // console.log(filtereddata)
        setDishes(filtereddata)
    }

    useEffect(() => {
        if (IsSimResDishes) {
            fetchSimResDishes()
        }
    }, [IsSimResDishes])


    async function fetchSimResDishes() {

        let path = `/city/${city}/${resLocation}`
        let encodedPath = encodeURIComponent(path)
        let data = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${dataQuery}&trackingId=undefined&submitAction=SUGGESTION&selectedPLTab=dish-add&restaurantMenuUrl=${encodedPath}-rest304086%3Fquery%3D${dataQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}&metaData=%7B%22type%22%3A%22DISH%22%2C%22data%22%3A%7B%22vegIdentifier%22%3A%22NA%22%2C%22cloudinaryId%22%3A%22z5s9vrflt9bnyqwgvbo3%22%2C%22dishFamilyId%22%3A%22846647%22%2C%22dishFamilyIds%22%3A%5B%22846647%22%5D%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Dish%22%7D`)
        let res = await data.json()
        setselectedResDish(res?.data?.cards[1])
        setSimilarResDishes(res?.data?.cards[2]?.card?.card?.cards)
        console.log(res);
        dispatch(resetSimilarResDish())
    }


    async function fetchResData() {
        let data = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${dataQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=0eeaa0ab-b3c9-789d-aa0a-04ad8eefe621&selectedPLTab=RESTAURANT`)
        let res = await data.json()
        setRestaurant((res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter((data) => data?.card?.card?.info))
        
    }


    useEffect(() => {
        if (dataQuery === "") {
            return
        }
        fetchResData()
        fetchDishData()
    }, [dataQuery, lat, lng])

    return (
        <div className='flex justify-center  '>
            <div className=' w-full md:w-[53%] p-4'>

            {!selectedResDish && (
                    <div className=' mt-9 '>
                        <input onChange={(e) => setdataQuery(e.target.value)} className='p-2 border border-black w-full text-sm md:text-lg' type="text " placeholder='Search for restaurant and food ' />
                        
                        <div className='flex gap-2 mt-3'>
                            {
                                filterOption.map((filterName, i) => (
                                    < div key={i}>
                                        <button onClick={() => handelfilter(filterName)} className={'border border-gray-300 shadow-md  px-4 md:px-4 py-2.5 md:py-1 mb-2 mt-3  rounded-full text-[12px] md:text-lg flex  items-center gap-0 md:gap-3 ' + (activeBtn === filterName ? "active" : "")}>
                                            <p>{filterName}</p>
                                        </button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            )}
                

                <div className='bg-gray-100 p-2 md:p-4 flex flex-wrap justify-center gap-3 md:gap-5'>
                    {
                        selectedResDish ?
                        <>
                            <div className='flex flex-col gap-4'>
                            <p>Itme added to cart </p>
                            <DishesData data={selectedResDish.card.card}/>
                            <p>More dishes from this restaurant</p>
                            </div>
                            <div className='w-full flex flex-wrap gap-5'>

                            {
                                SimilarResDishes.map((data)=><DishesData data={{...data.card , restaurant: selectedResDish.card.card.restaurant}}/>)
                            }
                            </div>
                        </>
                        :
                        activeBtn === "Dishes" ? Dishes.map((data) => <DishesData data={data.card.card} />) : Restaurant.map((data) => <RestaurantData data={data} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Search
