import { useState, useRef } from 'react';

import MultiSelect from '../components/MultiSelect';

import upload from '../images/upload.svg';

function Create() {
    const [image, setImage] = useState(null);

    const fileSelectorRef = useRef(null);

    const focusFileSelector = () => {
        fileSelectorRef.current.click();
    };

    return (
        <div className="box-border flex justify-center w-full h-full p-6">
            <div className="flex flex-col w-full max-w-md gap-8">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Upload File Here</h1>
                    {image ? (
                        <img src={image} />
                    ) : (
                        <>
                            <button
                                onClick={focusFileSelector}
                                className="flex items-center justify-center w-3/4 h-56 border-2 border-gray-400 border-dashed rounded-xl"
                            >
                                <img className="w-12" src={upload} alt="" />
                            </button>
                        </>
                    )}
                    <input
                        ref={fileSelectorRef}
                        className=""
                        type="file"
                        accept="image/*"
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-xl ">Caption</h1>
                    <textarea
                        className="w-full h-64 p-4 border-2 border-gray-400 rounded-xl"
                        id=""
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>
                <MultiSelect />
            </div>
        </div>
    );
}

export default Create;
