// import React, { useContext } from 'react';
// import { Google } from '@mui/icons-material';
// import { Button } from '@mui/material';
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import firebase from 'firebase/compat/app';
// import firebaseConfig from './firebase.config';
// import { UserContext } from '../../App';
// import { useLocation, useNavigate } from 'react-router-dom';



// const Login = () => {
//     const [loggedInUser, setLoggedInUser] = useContext(UserContext);
//     if (firebase.apps.length === 0) {
//         firebase.initializeApp(firebaseConfig);
//     }

//     const navigate = useNavigate();
//     const location = useLocation();
//     let { from } = location.state || { from: { pathname: '/' } };

//     const handleGoogleSignIn = () => {
//         const provider = new GoogleAuthProvider();
//         const auth = getAuth();
//         signInWithPopup(auth, provider)
//             .then((result) => {
//                 const { displayName, email } = result.user;
//                 const signedInUser = { name: displayName, email }
//                 setLoggedInUser(signedInUser);
//                 storeAuthToken();
//                 navigate(from);
//             }).catch((error) => {
//                 console.log(error);
//             });
//     }

//     const storeAuthToken = async () => {
//        await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
//             .then(idToken => {
//                 console.log('idToken', idToken);
//             }).catch(error => {
//                 console.log(error)
//             });
//     }

//     return (
//         <div>
//             <h3>This is Login</h3>
//             <Button onClick={handleGoogleSignIn} variant="contained" color="primary" startIcon={<Google />}>Google Sign IN</Button>
//         </div>
//     );
// };

// export default Login;





// import React, { useContext } from 'react';
// import { Google } from '@mui/icons-material';
// import { Button } from '@mui/material';
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import firebaseConfig from './firebase.config'; // Assuming this is your config
// import { UserContext } from '../../App';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { initializeApp } from 'firebase/app';
// import firebase from 'firebase/compat/app';

// const Login = () => {
//     const [loggedInUser, setLoggedInUser] = useContext(UserContext);

//     // Initialize Firebase if not already initialized
//     if (!firebase.apps.length) {
//         initializeApp(firebaseConfig);  // Use initializeApp from 'firebase/app'
//     }

//     const navigate = useNavigate();
//     const location = useLocation();
//     let { from } = location.state || { from: { pathname: '/' } };

//     const handleGoogleSignIn = () => {
//         const provider = new GoogleAuthProvider();
//         const auth = getAuth();  // Use getAuth() for authentication
//         signInWithPopup(auth, provider)
//             .then((result) => {
//                 const { displayName, email } = result.user;
//                 const signedInUser = { name: displayName, email };
//                 setLoggedInUser(signedInUser);
//                 storeToken();
//                 navigate(from);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     };

//     const storeToken = async () => {
//         await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
//             .then(idToken => {
//                 console.log(idToken);
//             }).catch(error => {

//             });
//     }

//     return (
//         <div>
//             <h3>This is Login</h3>
//             <Button onClick={handleGoogleSignIn} variant="contained" color="primary" startIcon={<Google />}>
//                 Google Sign IN
//             </Button>
//         </div>
//     );
// };

// export default Login;






import React, { useContext } from 'react';
import { Google } from '@mui/icons-material';
import { Button } from '@mui/material';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import firebaseConfig from './firebase.config'; // Assuming this is your config
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app'; // Modular Firebase

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    // Initialize Firebase if not already initialized
    initializeApp(firebaseConfig);  // Make sure firebaseConfig is valid

    const navigate = useNavigate();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: '/' } };

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();  // Use getAuth() for authentication
        signInWithPopup(auth, provider)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email };
                setLoggedInUser(signedInUser);
                storeToken(result.user);  // Pass the user object to storeToken
                navigate(from);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const storeToken = async (user) => {
        const auth = getAuth();
        user.getIdToken(/* forceRefresh */ true)
            .then(idToken => {
                sessionStorage.setItem('token', idToken);
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <h3>This is Login</h3>
            <Button onClick={handleGoogleSignIn} variant="contained" color="primary" startIcon={<Google />}>
                Google Sign IN
            </Button>
        </div>
    );
};

export default Login;
