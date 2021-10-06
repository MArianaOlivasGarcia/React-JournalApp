import React from 'react';
import { AppRouter } from './routers/AppRouter';
/* 3. USAR PROVIDER USANDO NUESTRO STORE */
import { Provider } from 'react-redux';
import { store } from './store/store';

export const JournalApp = () => {
    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    )
}
