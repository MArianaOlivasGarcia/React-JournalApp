
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
/* Thunk para trabajar acciones asincronas en nuestra app */
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';

/* 2. CREAR NUESTRA FUENTE UNICA DE LA VERDAD (STORE) */
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export const store = createStore( 
    reducers, 
    composeEnhancers(
        applyMiddleware( thunk )
    )
);