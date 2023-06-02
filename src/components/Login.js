import {useEffect, useState} from "react";
import styles from '../css/login.module.css';
import {getCommodities, getUsers, login} from "./utilities";
import {useNavigate} from "react-router-dom";

export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    const handleLogin = (event) => {
        event.preventDefault();

        login(username, password).then((user1) => {
            if(user1 != null) {
                setUser(user1);
                props.onLogin(user1.username);
                localStorage.setItem("username", user1.username);
                localStorage.setItem("token", user1.token);
                navigate('/');
            }
            else setError('Invalid username or password');
            console.log("user Is");
            console.log(user1);
        }).catch((error) => {
            console.log(error);
        });


        // setError('Invalid username or password');
    };

    useEffect(() => {
        // Add the login-body class to the body element
        document.body.classList.add(styles['login-body']);

        // Remove the login-body class when the component unmounts
        return () => {
            document.body.classList.remove(styles['login-body']);
        }
    }, []);

    return (
        <div className={styles['login-container']}>
            <div className={styles['logo']}></div>
            <div className={styles['login-block']}>
                <h1>Login</h1>
                {error && <p className={styles['login-error']}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <input type="text" id="username" placeholder="Username" className={styles['login-input']}
                           value={username} onChange={(event) => setUsername(event.target.value)}/>
                    <input type="password" id="password" placeholder="Password" className={styles['login-input']}
                           value={password} onChange={(event) => setPassword(event.target.value)}/>
                    <button type="submit" className={styles['login-button']}>Login</button>
                </form>
            </div>
        </div>
    );
}