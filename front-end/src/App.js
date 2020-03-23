import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import Login from "./login";
import SignUp from "./signup";

const URL = 'http://localhost:1234';

function App() {
    const [isLogin, setLogin] = useState(false);
    const [flagSignUp, setFlagSignUp] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLogin(JSON.parse(localStorage.getItem("token")))
        }
    }, []);

    const handleLinkClicked = () => setFlagSignUp(!flagSignUp);

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.post(`${URL}/users/register`, {
                email: username,
                password: password
            })
            if (result.data !== "User already exists") {
                localStorage.setItem("token", JSON.stringify(result.data));
                setLogin(result.data)
            } else {
                alert(result.data)
            }
        } catch (e) {
            console.log(e)
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(`${URL}/users/login`, {
                email: username,
                password: password
            });
            if (result.data) {
                localStorage.setItem("token", JSON.stringify(result.data));
                setLogin(result.data)
            } else {
                alert(result.data)
            }
        } catch (e) {
            console.log(e)
        }
    };

    return isLogin ? <div>{`Welcome ${isLogin.email}`}</div> : !flagSignUp ?
        <Login handleSignUpClick={handleLinkClicked} submitLogin={handleLogin} username={username}
               password={password} setEmail={setUsername} setPassword={setPassword}/> :
        <SignUp handleSignInClick={handleLinkClicked} submitSignUp={handleSignUp} username={username}
                password={password} setEmail={setUsername} setPassword={setPassword}/>
}

export default App;
