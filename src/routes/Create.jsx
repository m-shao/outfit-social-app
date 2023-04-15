import { useState, useRef } from "react"

import MultiSelect from "../components/MultiSelect"

import upload from '../images/upload.svg'

function Create() {
    const [image, setImage] = useState(null)   
    
    const fileSelectorRef = useRef(null)

    const focusFileSelector = () => {
        fileSelectorRef.current.click()
    }

    return (
        <div className="p-6 flex w-full h-full justify-center box-border">
            <div className="max-w-md w-full flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Upload File Here</h1>
                    {image ? (<img src={image}/>) : (
                    <>
                        <button onClick={focusFileSelector} 
                            className="w-3/4 h-56 border-2 border-gray-400 border-dashed rounded-xl flex justify-center items-center">
                            <img className="w-12" src={upload} alt="" />
                        </button>
                    </>)}
                    <input ref={fileSelectorRef} className="" type="file" />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-xl ">Caption</h1>
                    <textarea className="border-2 rounded-xl border-gray-400 w-full h-64 p-4" id="" cols="30" rows="10"></textarea>
                </div>
                <MultiSelect />
            </div>
        </div>
    )
}

export default Create