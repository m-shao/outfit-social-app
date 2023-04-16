# Documentation

## Auth

Auth is done with [Auth0](https://auth0.com/docs).

### User Login Credentials

The primary function of Auth0 is not to store user information such as a user biography, as Firestore does, but only to authenticate a user. It does however carry extra data (depending on the signup method), such as profile picture, name, IP adress, last login, and [more](https://auth0.com/docs/api/authentication#user-profile).

To use the data, import and use useAuth:
```JavaScript
import { useAuth0 } from '@auth0/auth0-react';
```
```JavaScript
const { user, isAuthenticated, isLoading } = useAuth0()
```

Auth is done with [Auth0](https://auth0.com/docs). The primary function of Auth0 is not to store user information such as a user biography, as Firestore does, but only to authenticate a user. It does however carry extra data (depending on the signup method), such as profile picture, name, IP adress, last login, and [more](https://auth0.com/docs/api/authentication#user-profile).

## Weather API

We can use these variables from open-meteo to process what the user should wear

**Weather Variables available:**

-   Maximum Temperature (2 m) - how warm it will be during the day - advise users to wear lighter clothes or layers.
-   Minimum Temperature (2 m) - how cold it will be during the day or night - advise users to wear heavier clothes or layers.
-   Precipitation Probability Max - chance of rain - advise users to bring an umbrella or raincoat if needed.
-   UV Index - strength of the sun's UV rays - advise users to wear sunscreen or protective clothing if needed.
-   Wind Speed - how strong the wind will be - advise users to wear appropriate clothing or accessories like a hat or scarf to protect them from the wind.
-   Sunrise and Sunset - how long day will be - advise users to wear appropriate clothing for the time of day.
-   Weathercode - general weather conditions - advise users to wear appropriate clothing for the weather (e.g., sunny, cloudy, rainy, etc.).

## Data
Data management is done with Firebase, through collections, specifically `users` and `posts`,

All references to `user` (not `users` (the collection)) in the code are from: 
```JavaScript 
const { user, isAuthenticated, isLoading } = useAuth0();
```

Sample User Data structure:
```JavaScript
const userData = {
    bio: biography, // string
    liked_posts: [], // array
    password: '', // string
    pfp: user?.picture, // string (link)
    posts: [], // array
    email: user?.email, // string
    userName: user?.name, //string
};
```

Sample Post Data structure:
```JavaScript
const postData = {
    caption: caption, // string
    comments: [], // array of objects
    image: imageRef, // ref from cloud storage
    likeCount: 0, // integer
    pfp: user.picture, // string (link)
    tags: [], // array 
    userName: user.name, // string
    links: affiliateLinks, // array of objects
};
```

### Read
firebaseConfig.js exposes the `retrieveData()` function which can be called with a `collectionName` (`users` or `posts`). The function returns an object with the data.
```JavaScript
import { useEffect, useState } from 'react';
const [userData, setUserData] = useState();

useEffect(() => {
    retrieveData(COLLECTION_NAME)
        .then((results) => {
            setUserData(results);
        })
}, []); 
```
You can also do the longer method to access the data by importing required functionality and insantiating the collection, with the COLLECTION_NAME: `users` or `posts`. Then retrieve the data, by using getDocs, and looping through the result. Use `.data()` to extract the data and not other extraneous information.

```JavaScript
import { db } from '../firebaseConfig'
import { getDocs, collection } from 'firebase/firestore'
import { useState } from 'react'
const [userData, setUserData] = useState();
const usersRef = collection(db, COLLECTION_NAME)

getDocs(usersRef).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        setUserData(doc.data())
    })
})
```

### Write
Writing to the firebase is much easier as it is a one liner.
Given data (`NEW_DATA`) simply use the following to push to `COLLECTION_NAME` (`users` or `posts`):
```JavaScript
addDoc(collection(database, COLLECTION_NAME), NEW_DATA);
```

## Cloud Storage (Images)
For all posts (creation or display) Firestore Cloud Storage is used.

### Create
```JavaScript
const file = fileInputRef.current.files[0]; // fileInputRef is a ref to a file-selector HTML input
const storageRef = ref(storage, Date.now() + user.name); // create unique ID reference to image
// Upload image and get downloadable URL this URL is then returned and can be used to load image
let imageRef = uploadBytes(storageRef, file).then(async (snapshot) => {
    return await getDownloadURL(snapshot.ref);
});
return imageRef;
```
### Read
*Image reading* is not really required, as long the downlodable URL is there. It can simply be used in an `<img/>` element.
