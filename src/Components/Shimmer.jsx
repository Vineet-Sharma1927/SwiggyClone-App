import React from 'react'

function Shimmer() {
  return (
    <div className='w-full'>
      <div className='h-[280px] bg-slate-900 flex justify-center items-center flex-col'>
        <div className='relative flex items-center justify-center w-[60px] '>
            <img className='w-20' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa" alt="" />
            <div className='absolute   loader ' ></div>
        </div>
        <h1 className='text-white font-bold mt-8 ml-3 text-2xl'>Looking for great food near you...</h1>
      </div>
      <div className='w-full md:w-[60%] mx-auto py-4 flex flex-wrap gap-10 md:gap-2 animate-pulse items-center justify-center'>
        <div className='w-[218px] h-[211px] mt-3 bg-gray-200 rounded-3xl'></div>
        <div className='w-[218px] h-[211px] mt-3 bg-gray-200 rounded-3xl'></div>
        <div className='w-[218px] h-[211px] mt-3 bg-gray-200 rounded-3xl'></div>
        <div className='w-[218px] h-[211px] mt-3 bg-gray-200 rounded-3xl'></div>
        <div className='w-[218px] h-[211px] mt-3 bg-gray-200 rounded-3xl'></div>
        <div className='w-[218px] h-[211px] mt-3 bg-gray-200 rounded-3xl'></div>
        <div className='w-[218px] h-[211px] mt-3 bg-gray-200 rounded-3xl'></div>
        <div className='w-[218px] h-[211px] mt-3 bg-gray-200 rounded-3xl'></div>
      </div>
    </div>
  )
}

export default Shimmer
