import React from 'react';
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@/store/store';

import Layout from "@/components/ui/layout";

import "@/scss/main.scss";

ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <Layout />
            </PersistGate>
        </Provider>
    ,
    document.getElementById('root')
);