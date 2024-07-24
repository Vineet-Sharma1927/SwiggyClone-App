import React from 'react'
import upArrow from '../assets/upArrow.svg'
import DownArrow from '../assets/DownArrow.svg'
import DetialMenu from './DetailMenu'
import { useState } from 'react'

function MenuCard({ card }) {

    let hello = false
    if (card["@type"]) {
        hello = true
    }
    const [isOpen, setisOpen] = useState(hello)

    function togglefunc() {
        setisOpen((prev) => !prev)
    }

    if (card.itemCards) {
        const { title, itemCards } = card
        return (
            <>
                <div className='mt-6'>
                    <div className='flex justify-between'>
                        <h2 className={'font-bold text-' + (card["@type"] ? "lg md:xl" : "sm md:base")}>{title} ({itemCards.length}) </h2>
                        {isOpen ? <img className='cursor-pointer' onClick={() => togglefunc()} src={upArrow} /> : <img className='cursor-pointer' onClick={() => togglefunc()} src={DownArrow} />}
                    </div>
                    <div>
                        {
                            isOpen && <DetialMenu itemCards={itemCards} />
                        }
                        <hr className={'my-3 md:my-5  border-slate-200 border-' + (card["@type"] ? "[10px] md:[12px]" : "[3px] md:[5px]")} />
                    </div>
                </div>
            </>
        )
    } else {
        const { title, categories } = card
        return (
            <>
                <h2 className=' font-bold text-lg md:text-xl'>{title}</h2>
                {
                    categories.map((data, i) => (
                        <MenuCard key={i} card={data}  />
                    ))
                }
            </>
        )
    }
}



export default MenuCard