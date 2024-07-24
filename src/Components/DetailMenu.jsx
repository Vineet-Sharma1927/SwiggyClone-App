import React, { useContext } from 'react'
import Rating from '../assets/Rating.svg'
import { useState } from 'react'
import {  ResInformation } from '../context/contextApi'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, clearCart } from '../utils/cartslice'
import toast from 'react-hot-toast'
import AddToCartBtn from './AddToCartBtn'
import { ToggleIsDiffRes } from '../utils/toogleslice'

function DetialMenu({ itemCards  }) {
    return (
        <div className='mt-4 md:mt-6'>
            {
                itemCards.map(({ card: { info } }, i) => (<DetailMenuCard key={i} info={info} />))
            }
        </div>
    )
}

function DetailMenuCard({ info }) {

    const {ResInfo} = useContext(ResInformation)
    // const ResInfo = useSelector((state)=>state.cartslice.resinfo)


    // const [IsDiffRes, setIsDiffRes] = useState(false)
    const IsDiffRes = useSelector((state=>state.toogleslice.IsDiffRes))
    
    const  { name, defaultPrice, price, itemAttribute: { vegClassifier }, ratings: { aggregatedRating: { rating, ratingCountV2 } }, description = "", imageId }=info
    {
        const [Ismore, setIsmore] = useState(false)
        let triDesc = description.substring(0, 127) + "..."
        const dispatch = useDispatch();


        function handleClearCart(){
            // setcartdata([])
            dispatch(clearCart())
            dispatch(ToggleIsDiffRes())
            toast.success("Clear Whole Cart ",{duration:3000})
        }
        function handleNo(){
            dispatch(ToggleIsDiffRes())
        }

        function handelIsDiffRes(){
            dispatch(ToggleIsDiffRes())
        }
        return (
            <div className='relative '>
                <div className='mt-5 flex flex-col-reverse md:flex-row md:items-center w-full  relative '>
                    <div className='w-[80%] md:w-[70%] mt-2 md:mt-0'>
                        {
                            vegClassifier === "VEG" ? <img className=' w-3.5 md:w-5' src="https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg" alt="" /> 
                            :
                            <img className='w-3.5 md:w-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/2048px-Non_veg_symbol.svg.png" alt="" />
                        }
                        <h2 className='font-bold text-lg md:text-xl w-[173px] md:w-full'>{name}</h2>
                        <h2 className='font-bold text-lg md:text-xl'>₹{defaultPrice / 100 || price / 100}</h2>
                        <p className='flex gap-2'><img src={Rating} alt="" /><span>{rating}({ratingCountV2})</span></p>

                        {description.length > 127 ?
                            <div>
                                <span className='text-[12px] md:text-md text-gray-600  mt-5' >{Ismore ? description + "..." : triDesc}</span>
                                <span><button className='text-[13px] md:text-base font-bold' onClick={() => setIsmore(!Ismore)}> {!Ismore ? "more" : "less"}</button></span>
                            </div>
                            :
                            <span className='text-[12px] md:text-md text-gray-600  mt-5' >{description}</span>
                        }

                    </div>
                    <div className='md:w-[30%] w-full   flex flex-col items-center justify-end '>
                        <img className='w-[280px] md:w-40 h-[170px] md:h-[144px] rounded-2xl ' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_400,c_fit/" + imageId} alt="" />
                        {/* <button onClick={handleCartData} className='border rounded-lg text-xl font-extrabold md:h-[47px] text-green-700 py-1 px-9 bg-white  drop-shadow absolute right-0 top-[185px] md:top-[110px] md:right-14 md:mr-1  md:bottom-0 hover:scale-110 md:scale-125 duration-100'>ADD</button> */}
                        <div className='absolute top-[85px] md:top-[10px] right-0 md:right-8'>
                        <AddToCartBtn info={info} ResInfo={ResInfo} handelIsDiffRes={handelIsDiffRes} />
                        </div>
                        
                    </div>
                </div>
                <hr className='mt-16 border' />
                <div className='flex justify-center '>
                    {
                        IsDiffRes && (
                            <div className='w-[350px] md:w-[528px] h-[204px] md:h-[204px] shadow-md bg-white fixed bottom-3 p-7 z-50 border-black'>
                                <h1 className='text-lg md:text-xl mb-1.5 md:mb-3 font-bold'>Items already in cart</h1>
                                <p className='text-[12px] md:text-sm font-semibold text-gray-500'>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                                <div className='flex gap-3 justify-evenly mt-4'>
                                    <button onClick={handleNo} className='w-[180px] md:w-[225px] p-1.5 md:p-2 font-semibold border-[#60b246] text-green border-2  '>No</button>
                                    <button onClick={handleClearCart} className='w-[180px] md:w-[225px] p-1.5 md:p-2 border-[#60b246] border-2  bg-[#60b246] text-white font-semibold'>Yes,Start AFresh</button>
                                </div>
                            </div>
                        )
                    }
                </div>
                
            </div>

        )
    }
}

export default DetialMenu