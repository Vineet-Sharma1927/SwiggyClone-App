import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../utils/cartslice'
import toast from 'react-hot-toast'

function AddToCartBtn({info,ResInfo,handelIsDiffRes}) {
    
    const cartdata = useSelector((state)=>state.cartslice.cartitems)
    const dispatch = useDispatch();
    let getInfoFromLocalStorage = useSelector((state)=>state.cartslice.resinfo)

    function handleCartData(){
        const isAdded = cartdata.find((data)=>data.id===info.id)
        if (!isAdded) {
            if(getInfoFromLocalStorage.name === ResInfo.name || getInfoFromLocalStorage.length === 0){
                dispatch(addToCart({info,ResInfo}))
                toast.success("Item Added" ,{duration:2000})
            }else{
                // alert("items is from different restaurant.... ")
                toast.error("Different Restaurant" ,{duration:2000})
                handelIsDiffRes()
            }
            
        }else{
            // alert("Already Added")
            toast.error("Already In the Cart " ,{duration:2000})
        }
    }
  return (
    <button onClick={handleCartData} className='border rounded-lg text-xl font-extrabold md:h-[47px] text-green-700 py-1 px-9 bg-white  drop-shadow absolute right-0 top-[105px] md:top-[110px] md:right-6 md:mr-1  md:bottom-0 hover:scale-110 md:scale-125 duration-100'>ADD</button>
  )
}

export default AddToCartBtn
