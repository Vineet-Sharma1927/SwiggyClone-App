import React from 'react'

function MenuShimmer() {
  return (
    <div className='w-full'>
      <div className='w-full md:w-[60%] mx-auto py-4 flex md:gap-10 gap-2 animate-pulse items-center justify-center'>
        <div className='w-[318px] h-[411px] mt-3 bg-gray-200 rounded-3xl'></div>
        <div className='w-[318px] h-[411px] mt-3 bg-gray-200 rounded-3xl'></div>
      </div>
    </div>
  )
}

export default MenuShimmer
