import React from 'react'
import Rating from '../assets/Rating.svg'
import rightArrow from '../assets/rightArrow.svg'
import { Link } from 'react-router-dom'
import AddToCartBtn from './AddToCartBtn'
import { useDispatch, useSelector } from 'react-redux'
import { setSimilarResDish,  ToggleIsDiffRes } from '../utils/toogleslice'
import { clearCart } from '../utils/cartslice'
import toast from 'react-hot-toast'

function DishesData({ data }) {

    const {info , restaurant: { info: ResInfo },hideRestaurantDetails=false }=data

    let { imageId = '', name, price, isVeg = 0 , id:itemId} = info
    let { id, name: resName, avgRating, sla: { slaString },slugs:{city,restaurant:resLocation} } = ResInfo

    const IsDiffRes = useSelector((state) => state.toogleslice.IsDiffRes)
    const dispatch = useDispatch()
    let {id:ResId} = useSelector((state)=>state.cartslice.resinfo)

    function handelIsDiffRes() {
        dispatch(ToggleIsDiffRes())
    }

    function handleIsSimResDishes() {
        if(ResId == id || !ResId){
            dispatch(setSimilarResDish ({
            IsSimResDishes:true,
            city,
            resLocation,
            resId:id,
            itemId
            }))
        }
        
    }

    function handleClearCart() {
        // setcartdata([])
        dispatch(clearCart())
        dispatch(ToggleIsDiffRes())
        toast.success("Clear Whole Cart ", { duration: 3000 })
    }
    function handleNo() {
        dispatch(ToggleIsDiffRes())
    }

    return (
        <>
            <div className='w-[280px] md:w-[300px] h-[240px] md:h-[280px] border rounded-3xl p-4 bg-white flex flex-wrap'>
                <Link to={`/RestaurantMenu/${id}`}>
            {
                !hideRestaurantDetails && (
                    <div className='flex justify-between items-center'>
                        <div>
                            <h2 className='text-gray-600 text-[14px] font-bold'>{resName}</h2>
                            <p className='text-gray-500 text-[12px] md:text-[14px] flex gap-2'><img className='w-4 ' src={Rating} alt="" /><span>{avgRating}</span><span>{slaString}</span></p>
                        </div>
                        <div><img className='w-8' src={rightArrow} alt="" /></div>
                    </div>
            )}
                </Link>

                <div className='mt-5 md:mt-10 flex gap-5 relative'>
                    <div className='w-[50%] '>
                        {isVeg === 1 ? <img className=' w-3.5 md:w-5' src="https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg" alt="" /> : <img className='w-3.5 md:w-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/2048px-Non_veg_symbol.svg.png" alt="" />}
                        <h1 className='text-[16px] md:text-sm font-bold '>{name}</h1>
                        <p className='text-[16px] md:text-lg font-bold'>₹{price / 100}</p>
                    </div>

                    <div>
                        <img className='w-[130px] md:w-[156px] h-[120px] md:h-[144px] rounded-xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,c_fit/${imageId}`} alt="" />
                        <div className='' onClick={handleIsSimResDishes}>
                            <AddToCartBtn info={info} ResInfo={ResInfo} handelIsDiffRes={handelIsDiffRes} />
                        </div>
                    </div>

                </div>
                
            </div>
                {
                    IsDiffRes && (
                        <div className='w-[350px] md:w-[528px] h-[204px] md:h-[204px] shadow-md bg-white fixed bottom-3 p-7 z-50 border-black left-[0] md:left-[15%] '>
                            <h1 className='text-lg md:text-xl mb-1.5 md:mb-3 font-bold'>Items already in cart</h1>
                            <p className='text-[12px] md:text-sm font-semibold text-gray-500'>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                            <div className='flex gap-3 justify-evenly mt-4'>
                                <button onClick={handleNo} className='w-[180px] md:w-[225px] p-1.5 md:p-2 font-semibold border-[#60b246] text-green border-2  '>No</button>
                                <button onClick={handleClearCart} className='w-[180px] md:w-[225px] p-1.5 md:p-2 border-[#60b246] border-2  bg-[#60b246] text-white font-semibold'>Yes,Start AFresh</button>
                            </div>
                        </div>
                    )
                }



        </>

    )
}

export default DishesData
