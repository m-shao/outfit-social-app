import { useState, useRef } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { database, storage } from '../firebaseConfig';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import MultiSelect from '../components/MultiSelect';

import upload from '../images/upload.svg';
import create from '../images/create.svg';
import { addDoc, collection } from 'firebase/firestore';
import { redirect } from 'react-router-dom';

function Create() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [image, setImage] = useState(null);
    const [clothingTypeText, setClothingTypeText] = useState('');
    const [linkText, setLinkText] = useState('');
    const [affiliateLinks, setAffiliateLinks] = useState([]);
    const [addLinkActive, setAddLinkActive] = useState(false);
    const [selectedItems, setSelectedItems] = useState({});
    const [caption, setCaption] = useState('');
    const fileInputRef = useRef(null);

    const navigate = useNavigate();

    const handleClothingChange = (e) => {
        setClothingTypeText(e.target.value);
    };
    const handleLinkChange = (e) => {
        setLinkText(e.target.value);
    };
    const handleLinkSubmit = (e) => {
        e.preventDefault();
        setAffiliateLinks([
            ...affiliateLinks,
            { clothingType: clothingTypeText, link: linkText },
        ]);
        setClothingTypeText('');
        setLinkText('');
        setAddLinkActive(false);
    };
    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
    };
    const focusFileSelector = () => {
        fileInputRef.current.click();
    };

    async function createPost() {
        await user;
        let imageRef = await uploadImage();
        // FIXME: Tags need to be fixed https://github.com/m-shao/outfit-social-app/issues/21
        const postData = {
            caption: caption,
            comments: [],
            image: imageRef,
            likeCount: 0,
            pfp: user.picture,
            tags: selectedItems,
            userName: user.name,
            links: affiliateLinks,
        };
        addDoc(collection(database, 'posts'), postData).then(() => {
            addDoc(collection(database, 'posts'), postData)
                .then(() => {
                    console.log('Post added successfully!');
                    navigate('/'); // navigate to the success page
                })
                .catch((error) => {
                    console.error('Error adding post: ', error);
                    navigate('/error'); // navigate to the error page
                });
            console.log('Post added successfully!');
        });
    }

    async function uploadImage() {
        await user;
        const file = fileInputRef.current.files[0];
        const storageRef = ref(storage, Date.now() + user.name);
        let imageRef = uploadBytes(storageRef, file).then(async (snapshot) => {
            return await getDownloadURL(snapshot.ref);
        });
        return imageRef;
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
                    <h1 className="text-xl font-bold">Caption</h1>
                    <textarea
                        className="w-full h-64 p-4 border-2 border-gray-400 rounded-xl"
                        id=""
                        cols="30"
                        rows="10"
                        value={caption}
                        onChange={handleCaptionChange}
                    ></textarea>
                </div>

                <div className="flex flex-col w-full gap-4">
                    <h1 className="text-xl font-bold">
                        Affiliate/Clothing Links
                    </h1>
                    <div className="flex flex-col gap-3 p-3 border">
                        {affiliateLinks.map((entry, index) => (
                            <div key={index} className="flex gap-2">
                                <h3>{entry.clothingType}:</h3>
                                <a
                                    target="_blank"
                                    className="flex-1 text-social-blue"
                                    href={entry.link ? entry.link : null}
                                >
                                    {entry.link}
                                </a>
                            </div>
                        ))}
                    </div>
                    {addLinkActive && (
                        <form
                            onSubmit={handleLinkSubmit}
                            className="flex flex-col w-full gap-3 pb-4 border-b"
                        >
                            <div className="flex gap-2">
                                <label>Clothing Type</label>
                                <input
                                    value={clothingTypeText && clothingTypeText}
                                    onChange={handleClothingChange}
                                    className="border"
                                    type="text"
                                />
                            </div>
                            <div className="flex gap-2">
                                <label>Insert Link</label>
                                <input
                                    value={linkText && linkText}
                                    onChange={handleLinkChange}
                                    className="border"
                                    type="url"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-24 px-2 py-1 text-white rounded-full bg-social-blue"
                            >
                                Submit
                            </button>
                        </form>
                    )}
                    <div>
                        <button
                            onClick={() => {
                                setAddLinkActive(true);
                            }}
                            className="flex items-center gap-1"
                        >
                            <h3>Add new link</h3>
                            <img className="w-6" src={create} alt="" />
                        </button>
                    </div>
                </div>
                <MultiSelect
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                    title="Choose Tags"
                />
                <div className="">
                    <button
                        className="px-4 py-2 text-white rounded-full bg-social-blue"
                        onClick={createPost}
                    >
                        Create Post
                    </button>
                </div>
                <div className="h-40"></div>
            </div>
        </div>
    );
}

export default Create;
