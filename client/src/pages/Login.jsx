import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useLogin} from "../hooks/useLogin";
import Loading from "../components/Loading/Loading";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';


function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const {logIn, error, isLoading} = useLogin();
    const navigate = useNavigate();

    const handleSignInSubmit = async (e) => {
        e.preventDefault();

        await logIn(userName, password);

        resetForm();
    };

    const resetForm = () => {
        if (!error) {
            setUserName('');
            setPassword('');
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignUpClick = () => {
        navigate('/register');
    };


    return (
        <div className="userform-container">
            {isLoading ? (
                <Loading/>
            ) : (
                <>
                    <h3>Log in</h3>
                    <form className="userform" onSubmit={handleSignInSubmit}>
                        <label>
                            Username:
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
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
                        {error &&
                            <div className="error">
                                {error}
                            </div>}
                        <button
                            id="submitlogin"
                            type="submit"
                            disabled={isLoading}>
                            Log in
                        </button>
                    </form>
                    <p>
                        Don't have an account?
                    </p>
                    <span
                        className="clickable-text"
                        onClick={() => handleSignUpClick()}>
                        Click here to sign up
                    </span>
                </>
            )}
        </div>
    );
}

export default Login;
