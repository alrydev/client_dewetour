import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContextProvider } from './context/userContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
const client = new QueryClient()

ReactDOM.render(
    <React.StrictMode>
        <UserContextProvider>
            <QueryClientProvider client={client}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </QueryClientProvider>
        </UserContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
