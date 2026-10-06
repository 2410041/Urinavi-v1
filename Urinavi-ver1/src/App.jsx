import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

import Language from './pages/Language/Language.jsx'

function App() {
    return (
        <>
            <BrowserRouter>
                <Route path="/Language" element={<Language />} />
            </BrowserRouter>
        </>
    )
}

export default App
