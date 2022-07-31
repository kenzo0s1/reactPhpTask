import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import Form from "./pages/form";
import News from "./pages/news";
import Home from "./pages/home";
import Navbar from "./components/navbar";

export default function App() {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/form" element={<Form />} />
                </Routes>
        </Router>
    );
}