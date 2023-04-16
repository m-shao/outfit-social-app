import { useState, useRef, useEffect } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import { useAuth0 } from '@auth0/auth0-react';
import MultiSelect from '../components/MultiSelect';

import upload from '../images/upload.svg';
import create from '../images/create.svg';

function Create() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [image, setImage] = useState(null);
    const [clothingTypeText, setClothingTypeText] = useState('');
    const [linkText, setLinkText] = useState('');
    const [affiliateLinks, setAffiliateLinks] = useState([]);
    const [addLinkActive, setAddLinkActive] = useState(false);

    const handleClothingChange= (e) => {
        setClothingTypeText(e.target.value);
    }
    const handleLinkChange= (e) => {
        setLinkText(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setAffiliateLinks([...affiliateLinks, {clothingType: clothingTypeText, link: linkText}]);
        setClothingTypeText('');
        setLinkText('');
        setAddLinkActive(false);
    }

    const [caption, setCaption] = useState('');
    const fileInputRef = useRef(null);

    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
    };
    const focusFileSelector = () => {
        fileInputRef.current.click();
    };

    async function createPost() {
        await user;
        console.log(user);
        let imageRef = await uploadImage();
        // FIXME: Tags need to be fixed https://github.com/m-shao/outfit-social-app/issues/21
        const postData = {
            caption: caption,
            comments: [],
            image: imageRef,
            likeCount: 0,
            pfp: user.picture,
            tags: [],
            userName: user.name,
        };
    }
    async function uploadImage() {
        await user;
        const file = fileInputRef.current.files[0];
        const storageRef = ref(storage, Date.now() + user.name);
        uploadBytes(storageRef, file);
        return storageRef;
    }
    function displayImage() {
        const file = fileInputRef.current.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target.result);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className="box-border flex justify-center w-full h-full p-6">
            <div className="flex flex-col w-full max-w-md gap-8">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">Upload File Here</h1>
                    {image ? (
                        // TODO: Add max width/ height
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
                        ref={fileInputRef}
                        className=""
                        type="file"
                        accept="image/*"
                        onChange={displayImage}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-xl ">Caption</h1>
                    <textarea
                        className="w-full h-64 p-4 border-2 border-gray-400 rounded-xl"
                        id=""
                        cols="30"
                        rows="10"
                        value={caption}
                        onChange={handleCaptionChange}
                    ></textarea>
                </div>

                <div className="flex flex-col gap-8 w-full">
                    <h1 className="text-xl">Affiliate/Clothing Links</h1>
                    <div className='border-b pb-4 flex flex-col gap-3'>
                        {affiliateLinks.map((entry, index) => (
                            <div key={index} className='flex gap-2'>
                                <h3>{entry.clothingType}:</h3>
                                <a target='_blank' className='text-social-blue flex-1' href={entry.link}>{entry.link}</a>
                            </div>
                        ))}
                    </div>
                    {addLinkActive && 
                        <form onSubmit={handleSubmit} className='flex flex-col gap-3 border-b pb-4 w-full'>
                            <div className='flex gap-2'>
                                <label>Clothing Type</label>
                                <input value={clothingTypeText && clothingTypeText} onChange={handleClothingChange} className='border' type="text" />
                            </div>
                            <div className='flex gap-2'>
                                <label>Insert Link</label>
                                <input value={linkText && linkText} onChange={handleLinkChange} className='border' type="url" />
                            </div>
                            <button type='submit' className='px-2 py-1 w-24 bg-social-blue text-white rounded-full'>
                                Submit
                            </button>
                        </form>
                    }
                    <div>
                        <button onClick={() => {setAddLinkActive(true)}} className='flex gap-1 items-center'>
                            <h3>Add new link</h3>
                            <img className='w-6' src={create} alt="" />
                        </button>
                    </div>
                    
                </div>
                <MultiSelect />
                <button onClick={createPost}>Create Post</button>
            </div>
        </div>
    );
}

export default Create;
