import { json, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, deleteFromCart } from '../utils/cartslice';
import toast from 'react-hot-toast';
import { loginToggle } from '../utils/toogleslice';
import Rating from '../assets/Rating.svg'

function Cart() {

    // const { cartdata, setcartdata } = useContext(CartContext)
    const cartdata = useSelector((state)=>state.cartslice.cartitems)
    const resinfo = useSelector((state)=>state.cartslice.resinfo)
    // console.log(resinfo);
    const UserData = useSelector((state)=>state.AuthSlice.userData)
    const dispatch = useDispatch()



    let totalPrice= 0;
    for (let i = 0; i < cartdata.length; i++) {
        totalPrice = totalPrice + cartdata[i].price / 100 || cartdata[i].defaultPrice /100
    }

    if (cartdata.length === 0) {
        return (
            <div className='w-full flex  justify-center items-center'>
                <div className='w-[50%] flex flex-col justify-center items-center ' >
                    <img src="" alt="" />
                    <h1 className='Font-bold text-2xl mt-3 mb-3 '>Your cart is Empty </h1>
                    <Link to={'/'}><p className='border border-black p-4 text-bold bg-orange-300 font-bold w-[100%]'>Search Food near you</p></Link>
                </div>
            </div>
        )
    }

    function handleDelete(i) {
        if(cartdata.length>1){
            let newArr = [...cartdata]
            newArr.splice(i, 1)
            // setcartdata(newArr)
            dispatch(deleteFromCart(newArr))
            toast.success("Item Removed",{duration:1000})
        }else{
            handleClearCart()
        }
    }

    function handleClearCart(){
        // setcartdata([])
        dispatch(clearCart())
        toast.success("Clear Whole Cart ",{duration:3000})
    }

    function handlePlaceOrder(){
        if (!UserData) {
            toast.error("Itni jldi kya hai pehle Log In to karlo Sir...")
            dispatch(loginToggle())
        }else{
            toast.success("Order Placed ",{duration:3000})
        }
    }

    return (
        <div className='w-full p-3 md:p-0'>
            <div className='w-full md:w-[50%] mx-auto mt-5'>
                <Link to={`/RestaurantMenu/${resinfo.id}`}>
                    <div className='flex gap-4 hover:scale-95 duration-300'>
                        <img className='w-32 md:w-56 rounded-3xl' src={`https://media-assets.swiggy.com/swiggy/image/upload/${resinfo.cloudinaryImageId}`} alt="" />
                        <div>
                            <h1 className='text-xl md:text-3xl font-bold mt-3'>{resinfo.name}</h1>
                            <p className='text-lg md:text-xl mt-5 mr-1 md:mr-2 flex items-center'>
                                <span>{resinfo.areaName}</span>
                                <span className='ml-1 md:ml-6'><img src={Rating} alt="" /></span>
                                <span className='ml-1'>{resinfo.avgRating}</span>
                            </p>
                            
                        </div>
                    </div>
                </Link>
                {
                    cartdata.map((data, i) => (

                        <div key={i} className='w-full flex justify-between  mt-6'>
                            <div className='w-[70%]'>
                                <h1 className=' text-bold text-lg md:text-xl '>{data.name}</h1>
                                <p>Price - ₹{data.price / 100 || data.defaultPrice / 100}</p>
                            </div>
                            <div className='w-[30%] relative  flex flex-col items-center justify-end '>
                                <img className='w-40 h-[120px] md:h-[144px] rounded-2xl' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_400,c_fit/" + data.imageId} alt="" />
                                <button onClick={() => handleDelete(i)} className='border rounded-lg text-lg md:text-xl font-extrabold text-red-700 py-1 px-4 md:px-9 bg-white  drop-shadow absolute bottom-0 hover:scale-110 duration-100'>Remove</button>
                            </div>
                        </div>
                    ))
                }
            <h1>Total Price - ₹{totalPrice}</h1>
            <div className='flex justify-between mt-4'>
                <button onClick={handlePlaceOrder} className='border-2 border-black bg-green-500 p-2 md:p-4 rounded-lg mt-3'>Place Order</button>
                <button onClick={handleClearCart} className='border-2 border-black bg-red-500 p-2 md:p-4 rounded-lg mt-3'>Clear Cart</button>
            </div>
            </div>
        </div>
    )
}

export default Cart
