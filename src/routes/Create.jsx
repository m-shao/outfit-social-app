import MultiSelect from "../components/MultiSelect"

import upload from '../images/upload.svg'

function Create() {

    return (
        <div className="p-6 flex w-full h-full justify-center box-border">
            <div className="max-w-md w-full flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Upload File Here</h1>
                    <div className="w-3/4 h-56 border-2 border-gray-400 border-dashed rounded-xl flex justify-center items-center">
                        <img className="w-12" src={upload} alt="" />
                    </div>
                    <input className="" type="file" />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-xl ">Upload File Here</h1>
                    <input className="border-2 rounded-xl border-gray-400 w-full h-64" type="text" />
                </div>
                <MultiSelect />
            </div>
        </div>
    )
}

export default Create