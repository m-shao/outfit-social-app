# Documentation

## Auth
Auth is done with [Auth0](https://auth0.com/docs).

## User Login Credentials
The primary function of Auth0 is not to store user information such as a user biography, as Firestore does, but only to authenticate a user. It does however carry extra data (depending on the signup method), such as profile picture, name, IP adress, last login, and [more](https://auth0.com/docs/api/authentication#user-profile).

To use this data, import and use useAuth:
```
import { useAuth0 } from '@auth0/auth0-react';
```
```
const { user, isAuthenticated, isLoading } = useAuth0()
```
