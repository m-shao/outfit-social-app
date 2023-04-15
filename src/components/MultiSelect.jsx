import React, { useState, useEffect } from "react"

import { clothingOptions } from "../data/constants"

import arrow from "../images/arrow.svg"
import search from '../images/search.svg'
import x from '../images/x.svg'

function MultiSelect() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [selectedCat, setSelectedCat] = useState('Tops')//categories
    const [selectedItems, setSelectedItems] = useState({})
    const [searchVal, setSearchVal] = useState('')

    const handleInput = (e) => {
        setSearchVal(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(searchVal)
    }

    const handleCheck = (e, currItem) => {
        if(e?.target?.checked){
            const newSelectedItems = {...selectedItems, [currItem]: true}
            setSelectedItems(newSelectedItems)
        }
        else{
            const newSelectedItems = {...selectedItems}
            delete newSelectedItems[currItem]
            setSelectedItems(newSelectedItems)
        }
    }


    return (
        <div className="w-full flex flex-col gap-2">
            <h1 className="font-bold">Multi-select</h1>
            <div className={'relative overflow-hidden w-full bg-gray-100 rounded-3xl px-4 py-3 flex flex-col gap-3 ' 
            + (menuOpen ? 'h-auto items-start ' : 'h-13 items-center ')}>
                <div className="flex justify-between w-full">
                    {!Object.keys(selectedItems).length ? 
                    <p className="text-gray-400 text-sm">Choose a tag.</p> :
                    <div className="flex flex-wrap gap-2">
                        {Object.keys(selectedItems).map((item, index) => (
                            <div key={item} className="bg-social-blue text-white text-sm py-2 pl-4 pr-2 rounded-full flex justify-between gap-2">
                                <h1>{item}</h1>
                                <button onClick={() => {handleCheck(null, item)}}>
                                    <img src={x} alt="" />
                                </button>
                            </div>
                        ))}
                    </div>}
                    <button className="absolute top-5 right-5" onClick={() => {setMenuOpen(prev => !prev)}}>
                        <img className={'transition-all ' + (menuOpen && 'rotate-180')} src={arrow} alt="arrow"/>
                    </button>
                </div>
                <div className={'w-full flex flex-col gap-4 ' + (!menuOpen && 'hidden')}>
                    <form onSubmit={handleSubmit} className="text-sm bg-white pl-4 pr-2 py-1 w-3/4 rounded-full flex justify-between">
                        <input value={searchVal}
                            onChange={handleInput} 
                            placeholder="Search"
                            className="w-full"/>
                        <button type="submit" className="">
                            <img className="h-7" src={search} alt=""/>
                        </button>
                    </form>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap justify-evenly">
                            {Object.keys(clothingOptions).map(
                            (option, index) => (
                                <React.Fragment key={option}>
                                    {index != 0 && <h1 className="inline text-gray-300">|</h1>}
                                    <button onClick={() => {setSelectedCat(option)}} className={"mx-2 inline text-sm " 
                                        + (option == selectedCat ? 'text-black font-bold' : 'text-gray-300')} >
                                        {option}
                                    </button>
                                </React.Fragment> 
                            ))}
                        </div>
                        
                        <div className="flex flex-wrap gap-4 justify-evenly">
                            {Object.keys(clothingOptions[selectedCat]).map((item, index) => (
                                <div key={item} className="flex gap-2">
                                    <div className="relative">
                                        <input type="checkbox" 
                                            onChange={(e) => {handleCheck(e, item)}}
                                            className="appearance-none w-3 h-3 border border-black rounded-sm 
                                                    checked:bg-social-blue checked:border-transparent"
                                            checked={selectedItems[item] ? selectedItems[item] : false}
                                            id={item} name={item} value={item} />
                                    </div>
                                    
                                    <label htmlFor={item}>{item}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MultiSelect