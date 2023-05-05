import '../css/App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {getBuyList} from "./utilities";
import Login from "./Login";
import Home from '../components/Home';
import {useEffect, useState} from "react";
import Product from "./Product";
import Providers from "./Providers";
import User from "./User";
import Register from "./register";



function App() {
    const [loggedIn, setLoggedIn] = useState('');
    const [buyList, setBuyList] = useState([]);
    useEffect(() => {
        getBuyList().then((buyList) => {
            setBuyList(buyList);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    let cartNum = buyList.length;

    const handleLogin = (isLoggedIn) => {
        setLoggedIn(isLoggedIn);
    }
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home loggedIn={loggedIn} cartNum={cartNum}/>}/>
                <Route path="/user/:name" element={<User loggedIn={loggedIn} cartNum={cartNum}/>}/>
                <Route path="/product/:id" element={<Product loggedIn={loggedIn} cartNum={cartNum}/>}/>
                <Route path="/provider/:id" element={<Providers loggedIn={loggedIn} cartNum={cartNum}/>}/>
                <Route path="/login" element={<Login onLogin={handleLogin}/>} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
