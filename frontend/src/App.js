import React from 'react'
import MainPage from './pages/Main/MainPage'
import { CookiesProvider } from 'react-cookie'


const App = () => {
    return (
        <CookiesProvider>
            <MainPage />
        </CookiesProvider>
    );
}

export default App
