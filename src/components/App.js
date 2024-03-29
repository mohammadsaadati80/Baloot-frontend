import '../css/App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {getBuyList, getCommodities, temp_comment} from "./utilities";
import Login from "./Login";
import Home from '../components/Home';
import {useEffect, useState} from "react";
import Product from "./Product";
import Providers from "./Providers";
import User from "./User";
import Register from "./register";
import Callback from "./Callback";



function App() {

    const [loggedIn, setLoggedIn] = useState('');

    const handleLogin = (isLoggedIn) => {
        setLoggedIn(isLoggedIn);
    }
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home loggedIn={loggedIn} />}/>
                <Route path="/user/:name" element={<User loggedIn={loggedIn} />}/>
                <Route path="/product/:id" element={<Product loggedIn={loggedIn} />}/>
                <Route path="/provider/:id" element={<Providers loggedIn={loggedIn} />}/>
                <Route path="/login" element={<Login onLogin={handleLogin}/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/oauth/redirect" element={<Callback />} />
            </Routes>
        </Router>
    );
}

export default App;
