import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export function useSignup() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const signUp = async (userName, email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userName, email, password}),
        });
        const signupResponse = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(signupResponse.error);
        }

        if (response.ok) {
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(signupResponse));

            //update AuthContext
            dispatch({type: 'LOGIN', payload: signupResponse});

            setIsLoading(false);
        }
    }
    return {signUp, isLoading, error};
}
