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
Auth is done with [Auth0](https://auth0.com/docs). The primary function of Auth0 is not to store user information such as a user biography, as Firestore does, but only to authenticate a user. It does however carry extra data (depending on the signup method), such as profile picture, name, IP adress, last login, and [more](https://auth0.com/docs/api/authentication#user-profile).

## Data
Data management is done with Firebase, through collections.

### Read
firebaseConfig.js exposes the `retrieveData()` function which can be called with a `collectionName` (`users` or `posts`). THe function returns an object with the data.
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