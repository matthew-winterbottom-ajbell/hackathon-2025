import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/home';
import Call from "./pages/call.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/call/:id" element={<Call />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
