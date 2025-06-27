import {BrowserRouter, Link, Route, Routes, useLocation} from 'react-router-dom';
import './App.css'
import Home from './pages/home';
import Conversation from "./pages/conversation.tsx";
import BotConversation from "./pages/botConversation.tsx";

function Breadcrumbs() {
    const location = useLocation();
    if (location.pathname === "/") return null;
    return (
        <div className="mb-4">
            <Link
                to="/"
                className="inline-flex items-center text-slate-300 hover:text-slate-100 font-medium text-sm"
            >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Dashboard
            </Link>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Breadcrumbs />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/call/:id" element={<Conversation />} />
                <Route path="/chat/:id" element={<BotConversation />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
