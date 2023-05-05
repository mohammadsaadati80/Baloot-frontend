import '../css/register.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {addUser} from "./utilities";
export default function Register() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        // Do something with the form data
        console.log({ name, address, birthDate, email, password });
        addUser(name, address, birthDate, email, password);
        // Reset the form
        setName('');
        setAddress('');
        setBirthDate('');
        setEmail('');
        setPassword('');
        navigate('/login');
    }

    return (
        <div className="container">
            <form method="post" autoComplete="on" onSubmit={handleSubmit}>

                <div className="box">
                    <label htmlFor="firstName" className="fl fontLabel"> Name: </label>
                    <div className="new iconBox">
                        <i className="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <div className="fr">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Name"
                            className="textBox"
                            autoFocus="on"
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="clr"></div>
                </div>

                <div className="box">
                    <label htmlFor="secondName" className="fl fontLabel"> Address </label>
                    <div className="fl iconBox"><i className="fa fa-user" aria-hidden="true"></i></div>
                    <div className="fr">
                        <input
                            type="text"
                            name="secondName"
                            placeholder="Address"
                            className="textBox"
                            required
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                        />
                    </div>
                    <div className="clr"></div>
                </div>

                <div className="box">
                    <label htmlFor="phone" className="fl fontLabel"> Birth Date: </label>
                    <div className="fl iconBox"><i className="fa fa-phone-square" aria-hidden="true"></i></div>
                    <div className="fr">
                        <input
                            type="text"
                            name="phoneNo"
                            maxLength="10"
                            placeholder="Birth Date"
                            className="textBox"
                            required
                            value={birthDate}
                            onChange={(event) => setBirthDate(event.target.value)}
                        />
                    </div>
                    <div className="clr"></div>
                </div>

                <div className="box">
                    <label htmlFor="email" className="fl fontLabel"> Email ID: </label>
                    <div className="fl iconBox"><i className="fa fa-envelope" aria-hidden="true"></i></div>
                    <div className="fr">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Id"
                            className="textBox"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="clr"></div>
                </div>

                <div className="box">
                    <label htmlFor="password" className="fl fontLabel"> Password </label>
                    <div className="fl iconBox"><i className="fa fa-key" aria-hidden="true"></i></div>
                    <div className="fr">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="textBox"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="clr"></div>
                </div>

                <div className="box terms">
                    <input type="checkbox" name="Terms" required /> &nbsp; I accept the terms and conditions
                </div>

                <div className="box last_submit" >
                    <input type="Submit" name="Submit" className="submit" value="SUBMIT" />
                </div>

            </form>
        </div>
    );
}