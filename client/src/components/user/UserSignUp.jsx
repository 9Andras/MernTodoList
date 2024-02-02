import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useSignup} from "../../hooks/useSignup";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import "./UserSignUp.css";

function UserSignUp() {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {signUp, error, isLoading} = useSignup();
    const navigate = useNavigate();


    const handleSignUpSubmit = async (e) => {
        e.preventDefault();

        await signUp(userName, email, password);

        resetForm();
    };

    const resetForm = () => {
        if (!error) {
            setUserName('');
            setEmail('');
            setPassword('');
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleBackToLoginClick = () => {
        navigate('/login')
    };

    return (
        <div className="form-container" id="signup">
            <h3>Create your account here!</h3>
            <>
                <form className="UserSignUpForm" onSubmit={handleSignUpSubmit}>
                    <label>
                        User Name:
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Email Address:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
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
                    {error &&
                        <div className="error">
                            {error}
                        </div>
                    }
                    <button
                        id="submitcomplete"
                        disabled={isLoading}
                        type="submit">Complete sign up
                    </button>
                </form>
                <span
                    className="clickable-text"
                    onClick={() => handleBackToLoginClick()}>
                    Login
                </span>
            </>
        </div>
    )
}

export default UserSignUp;
