import { useEffect, useState } from "react";
import styles from '../css/login.module.css';
import {getUsers, login} from "./utilities";
import {useNavigate} from "react-router-dom";

export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then((users) => {
            setUsers(users);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        ;

        const user = users.find((user) => user.username === username && user.password === password);

        if (user) {
            login(username, password)
            props.onLogin(user.username);
            navigate('/');
        } else {
            setError('Invalid username or password');
        }
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
                    <input type="text" id="username" placeholder="Username" className={styles['login-input']} value={username} onChange={(event) => setUsername(event.target.value)} />
                    <input type="password" id="password" placeholder="Password" className={styles['login-input']} value={password} onChange={(event) => setPassword(event.target.value)} />
                    <button type="submit" className={styles['login-button']} >Login</button>
                </form>
            </div>
        </div>
    );
}