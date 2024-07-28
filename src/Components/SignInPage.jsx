import { signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../Config/firbaseAuth'
import { useDispatch, useSelector } from 'react-redux'
import { AddUserData, DeleteUserData } from '../utils/AuthSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { loginToggle } from '../utils/toogleslice'

function SignInPage() {

    const UserData = useSelector((state) => state.AuthSlice.userData)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const Loginvisible = useSelector((state) => state.toogleslice.loginToggle)

    async function handleAuth() {
        let data = await signInWithPopup(auth, provider)
        const UserData = {
            name: data?.user?.displayName,
            photo: data?.user?.photoURL
        }
        dispatch(AddUserData(UserData))
        dispatch(loginToggle())
        navigate("/")
        toast.success(`Signed In As ${UserData.name}`)
    }

    async function handleLogOut() {
        await signOut(auth);
        dispatch(DeleteUserData())
        dispatch(loginToggle())
        toast.success("Log Out Successfully....")
    }
    return (
        <>
            <div className='flex justify-between items-center w-full md:w-[87%] gap-8 md:gap-12'>
                <div className='w-[50%]'>
                    {UserData ? <h1 className='font-bold text-[26px] md:text-[32px] mt-7 '>Log Out</h1>:<h1 className='font-bold text-[32px] mt-7 '>Login</h1>}
                    
                    <div className='border-2 border-[#fc8019] w-16 mt-7 md:mt-10'></div>
                </div>
                <div className='w-[50%]'>
                    <img className='w-28 md:w-36' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
                </div>
            </div>
            <div className='w-full md:w-[87%]'>
                {UserData ? <button onClick={handleLogOut} className='bg-[#fc8019] text-white mt-10 md:mt-5 w-full p-3 md:p-5 text-lg font-semibold border-black hover:rounded-xl hover:scale-95  duration-100 '>Log Out </button>:<button onClick={handleAuth} className='bg-[#fc8019] text-white mt-10 md:mt-5 w-full p-3 md:p-5 text-lg font-semibold border-black hover:rounded-xl hover:scale-95  duration-100 '>Google Login </button>}
                <p className='text-[10px] mt-2 md:text-[15px]'>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
            </div>
        </>
    )
}

export default SignInPage
