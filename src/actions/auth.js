

import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2';


export const startLoginWithEmailAndPassword = (email, password) => {

    return ( dispatch ) => {

        dispatch( startLoading() );

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( ({user}) => {
                dispatch( login( user.uid, user.displayName ) );
                dispatch( finishLoading() );
            }).catch( err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.message
                })
                dispatch( finishLoading() );
            })

    }

}


export const startGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            // .then( userCredential => {
            .then( ({ user }) => {
                dispatch( login(user.uid, user.displayName) );
            })
    }
}



export const startRegisterWithemailAndPasswordAndName = ( email, password, name ) => {

    return ( dispatch ) => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async ({user}) => {
                await user.updateProfile({displayName:name})
                dispatch( login( user.uid, user.displayName ) );
            }).catch( err =>{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.message
                })
            })

    }


}


export const login = (uid, displayName) => {

    return {
        type: types.login,
        payload: {
            uid,
            name: displayName
        }
    }

}



export const startLogout = () => {

    return async( dispatch ) => {
        await firebase.auth().signOut();

        dispatch( logout() );
    }

}



export const logout = () => {
    return {
        type: types.logout
    }
}