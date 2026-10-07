import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'

import Language from './pages/Language/Language.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Language" element={<Language />} />
                {/* <Route path="/Home" element={<Home />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default App