import React, {useEffect, useState} from 'react';
import './App.css';
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
            setLogin(localStorage.getItem("token"))
        }
    }, []);

    const handleLinkClicked = () => setFlagSignUp(!flagSignUp);

    const handleSignUp = (e) => {
        e.preventDefault()
        fetch(`${URL}/users/register`, {
            method: "POST",
            body: JSON.stringify({
                email: username,
                password: password
            })
        }).then(res => res.json()).then(data => console.log(data));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`${URL}/users/login`, {
            method: "POST",
            body: JSON.stringify({
                email: username,
                password: password
            })
        }).then(res => res.json()).then(data => console.log(data));
    };

    return isLogin ? <div>Dashboard</div> : !flagSignUp ?
        <Login handleSignUpClick={handleLinkClicked} submitLogin={handleLogin} username={username}
               password={password} setEmail={setUsername} setPassword={setPassword}/> :
        <SignUp handleSignInClick={handleLinkClicked} submitSignUp={handleSignUp} username={username}
                password={password} setEmail={setUsername} setPassword={setPassword}/>
}

export default App;
