import React, { useContext } from 'react'
import SwiggyLogo from '../assets/SwiggyLogo.svg'
import arrow from '../assets/arrow.svg'
import box from '../assets/box.svg'
import search from '../assets/search.svg'
import offer from '../assets/offer.svg'
import help from '../assets/help.svg'
import sign from '../assets/sign.svg'
import cart from '../assets/cart.svg'
import cross from '../assets/cross.svg'
import location from '../assets/location.svg'
import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Coordinates } from '../context/contextApi'
import { useDispatch, useSelector } from 'react-redux'
import { loginToggle, toogleSearchBar } from '../utils/toogleslice'
import SignInPage from './SignInPage'

function Head() {

    const array = [
        {
            name: "Search",
            image: <img src={search} alt="" />,
            path: "/Search"
        },
        {
            name: "Cart",
            image: <img src={cart} alt="" />,
            path: "/Cart"
        },
        {
            name: "Sign In",
            image: <img src={sign} alt="" />,
            path: "/Sign_In"
        }
    ]

    // getting data using context api 
    // const { visible, setvisible } = useContext(Visibility)

    // getting data using redux toolkit 
    const visible = useSelector((state) => state.toogleslice.searchBarToogle)
    const Loginvisible = useSelector((state) => state.toogleslice.loginToggle)
    const dispatch = useDispatch()

    const { setcoor } = useContext(Coordinates)
    // const {cartdata} = useContext(CartContext)
    const cartdata = useSelector((state) => state.cartslice.cartitems)
    const UserData = useSelector((state) => state.AuthSlice.userData)


    const [SearchResult, setSearchResult] = useState([])
    const [address, setaddress] = useState('')


    async function fetchSearchdata(val) {
        if (val == "") return
        const res = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/place-autocomplete?input=${val}`)
        const req = await res.json();
        setSearchResult(req?.data)
    }

    async function fetchCoor(id) {
        if (id == "") return
        const res = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/address-recommend?place_id=${id}`)
        const req = await res.json();
        setcoor({
            lat: req?.data[0]?.geometry?.location?.lat,
            lng: req?.data[0]?.geometry?.location?.lng
        })
        setaddress(req?.data[0]?.formatted_address)
        handlevisible()
    }

    function handlevisible() {
        dispatch(toogleSearchBar())
    }
    function handleLoginvisible() {
        dispatch(loginToggle())
    }
    return (
        <>

            <div className='w-full'>    {/*This div is for search location section */}
                <div onClick={handlevisible} className={"w-full bg-black/50 z-30 absolute  h-full " + (visible ? "visible " : " invisible")}></div>
                <div className={'w-full md:w-[37%] flex justify-end h-full bg-white absolute z-40  p-5 duration-500  ' + (visible ? "left-[0]" : "-left-[100%]")}>
                    <div className='flex flex-col gap-4 mr-6 w-[87%] '>
                        <p onClick={handlevisible} className='mt-7 mb-5'><img className='w-7' src={cross} alt="" /></p>
                        <input type="text" className='border-2 focus:outline-none focus:shadow-lg p-3 w-[100%]' placeholder='Search for area, street name..' onChange={(e) => fetchSearchdata(e.target.value)} />
                        <div className='pl-8 pt-4 '>
                            <ul >
                                {
                                    SearchResult.map((data, i) => (
                                        <div key={i}>
                                            <div className='flex  gap-5'>
                                                <img className='w-6 mb-8' src={location} alt="" />
                                                <li key={i} className='mt-3 cursor-pointer decoration-dashed pb-2' onClick={() => fetchCoor(data?.place_id)}><p >{data?.structured_formatting.main_text}</p> <p className='text-[12px] opacity-65'>{data?.structured_formatting.secondary_text}</p><p className='opacity-40 pt-2'>------------------------------------------------</p></li>
                                            </div>
                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full '>    {/*This div is for Sign In Page*/}
                <div onClick={handleLoginvisible} className={"w-full bg-black/50 z-30 fixed  h-full " + (Loginvisible ? "visible " : " invisible")}></div>
                <div className={'w-full md:w-[37%] flex justify-end h-full bg-white fixed z-40  p-5 duration-500 ' + (Loginvisible ? "right-[0]" : "-right-[100%] ")}>
                    <div className='flex flex-col gap-4 mr-6 w-[85%] '>
                        <p onClick={handleLoginvisible} className='mt-7 mb-5'><img className='w-7' src={cross} alt="" /></p>
                        <SignInPage />
                    </div>
                </div>
            </div>

            <div className='relative '>
                <div className='w-full sticky  shadow-lg  h-20 flex justify-center items-center text-gray-600 font-semibold '>   {/*This div is for navbar section*/}
                    <div className=' md:p-3 flex justify-between gap-12 md:gap-0 w-[90%]'>
                        <div className='flex justify-start items-center gap-12 md:gap-9 w-[30%]'>
                            <Link to={'/'} >
                                <div className='w-6 md:w-16'>
                                    <img className='cursor-pointer' src={SwiggyLogo} alt="logo" />
                                </div>
                            </Link>
                            <div onClick={handlevisible} className='flex  justify-center items-center cursor-pointer gap-1 min-w-[50%]'>
                                <button className='lborder border-b-2 text-sm md:text-xl border-slate-600 font-bold text-slate-600 hover:text-orange-500'>Other</button>

                                {address ?
                                    <span className=' pl-2  text-[13px] text-gray-700 font-semibold opacity-60 line-clamp-1'>{address}</span>
                                    : <span className=' pl-2  text-[14px] text-gray-700 font-semibold opacity-60 line-clamp-1'>Cyber Hub Gurgoan</span>
                                }
                                <button className='max-w-22'><img className='max-w-28 ' src={arrow} alt="" /></button>
                            </div>
                        </div>
                        <div className='flex justify-evenly items-center w-[70%] md:w-[40%] '>
                            {
                                array.map((data, i) => (
                                    data.name == "Sign In" ?
                                        <div onClick={handleLoginvisible} key={i}>
                                            <div className='flex gap-1 cursor-pointer hover:text-orange-500 items-center' >
                                                <p>{UserData ? <img className='rounded-full w-8 md:w-10' src={UserData.photo} alt="" /> : data.image}
                                                </p>
                                                <h3 className='hidden md:block'>{UserData ? UserData.name : data.name}</h3>
                                                {data.name === "Cart" && (cartdata.length > 0 ? <p>{cartdata.length}</p> : "")}
                                            </div>
                                        </div>
                                        :
                                        <Link to={data.path} key={i}>
                                            <div className='flex   gap-1 cursor-pointer hover:text-orange-500' >
                                                {data.image}
                                                <h3 className='hidden md:block'>{data.name}</h3>
                                                {data.name === "Cart" && (cartdata.length > 0 ? <p>{cartdata.length}</p> : "")}
                                            </div>
                                        </Link>
                                ))
                            }


                        </div>
                    </div>
                </div>
                <Outlet />  {/*This is used when we doing nestted routing  */}
            </div>
        </>
    )
}

export default Head
