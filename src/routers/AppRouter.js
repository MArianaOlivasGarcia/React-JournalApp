import React, { useEffect, useState } from 'react';
import { firebase } from '../firebase/firebase-config';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNote } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    /* Revisar el estado de firebase */
    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    /* al no tener fependencia solo se va a ejecutar 1 vez */
    useEffect( () => {

        firebase.auth().onAuthStateChanged( async (user) => {

            if ( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn(true);

                /* Obtener las notes del usuario */
                dispatch( startLoadingNote( user.uid ) );
            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);

        })

    }, [ dispatch, setChecking, setIsLoggedIn ] );

    if ( checking ) {
        return (
            <h1>Wait...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={ isLoggedIn }
                    />

                    <PrivateRoute
                        isAuthenticated={ isLoggedIn } 
                        exact
                        path="/"
                        component={ JournalScreen }
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
