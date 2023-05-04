import '../css/App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./Login";
import Home from '../components/Home';
import {useState} from "react";
import Product from "./Product";
import Providers from "./Providers";
import User from "./User";
import Register from "./register";



function App() {
    const [loggedIn, setLoggedIn] = useState('');

    const handleLogin = (isLoggedIn) => {
        setLoggedIn(isLoggedIn);
    }
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home loggedIn={loggedIn}/>}/>
                <Route path="/user/:name" element={<User loggedIn={loggedIn}/>}/>
                <Route path="/product/:id" element={<Product loggedIn={loggedIn}/>}/>
                <Route path="/provider/:id" element={<Providers loggedIn={loggedIn}/>}/>
                <Route path="/login" element={<Login onLogin={handleLogin}/>} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
