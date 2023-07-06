import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import reportWebVitals from './reportWebVitals';
import {persistor, store} from "./Store/store";
import {Main} from "./Pages/Main";
import {Popup} from "./Components/Popup";
import {PersistGate} from 'redux-persist/integration/react'
import {Notifies} from "./Components/Notifies";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
                <Main/>
            <Notifies/>
        </PersistGate>
    </Provider>
);

reportWebVitals();
