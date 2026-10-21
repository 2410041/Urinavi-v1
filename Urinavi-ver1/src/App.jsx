import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import "./i18n";

import Language from './pages/Language/Language.jsx';
import Home from './pages/Home/Home.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Language" element={<Language />} />
                <Route path="/Home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App