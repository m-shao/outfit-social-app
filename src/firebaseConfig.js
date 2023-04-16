import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, setDoc, collection } from 'firebase/firestore';
import { getStorage, ref } from 'firebase/storage';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
    authDomain: 'outfit-social-app.firebaseapp.com',
    projectId: 'outfit-social-app',
    storageBucket: 'outfit-social-app.appspot.com',
    messagingSenderId: `${import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${import.meta.env.VITE_FIREBASE_APP_ID}`,
    measurementId: `${import.meta.env.VITE_FIREBASE_MEASUREMENT_ID}`,
    storageBucket: 'gs://outfit-social-app.appspot.com',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const database = getFirestore(app);
const storage = getStorage(app);

function retrieveData(collectionName) {
    let results = {};
    const dataRef = collection(database, collectionName);
    return getDocs(dataRef)
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                results[doc.id] = doc.data();
            });
            return results;
        })
        .catch((error) => {
            // Throwing defined errors allows for better debugging
            throw new Error(
                `Error retrieving data from '${collectionName}' collection: ${error.message}`
            );
        });
}

async function validateUser(userName) {
    const users = retrieveData('users');

    return Object.keys(await users).map((user) => {
        if (user == userName) {
            return true;
        }
    });
}

function appendUserData(userName, data) {
    setDoc(doc(database, 'users', userName), data);
}

function appendPostData(data) {
    addDoc(collection(db, collectionName), data).then((docRef) => {});
}
export { database, storage, retrieveData, validateUser };
