import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import "./UserLogin.css"


function UserLogin() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSignInSubmit = async (user) => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            //console.log(data)
            resetForm();
        } catch (error) {
            alert('An error occurred while signing in! Please check your username and password, then try again!');
            console.error('An error occurred while signing in:', error);
        }
    };

    const resetForm = () => {
        setUserName('');
        setPassword('');
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSignInSubmit({userName, password});
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignUpClick = () => {
        navigate('/register')
    };


    return (
        <div className="form-container" id="signin">
            <h3>Log in</h3>
            <form className="UserSignUpForm" onSubmit={onSubmit}>
                <label>
                    User Name:
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)}
                           required/>
                </label>
                <label>
                    Password:
                    <div className="password-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEye : faEyeSlash}
                            className="password-toggle-icon"
                            onClick={handleTogglePasswordVisibility}
                        />
                    </div>
                </label>
                <button
                    id="submitlogin"
                    type="submit">Log in
                </button>
            </form>
            <p>
                Don't have an account?{' '}
            </p>
            <span className="clickable-text" onClick={() => handleSignUpClick()}> Click here to sign up </span>
        </div>
    );
}

export default UserLogin;
