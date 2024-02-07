import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export function useLogin() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const logIn = async (userName, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({userName, password}),
        });
        const loginResponse = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(loginResponse.error);
        }

        if (response.ok) {
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(loginResponse));

            //update AuthContext
            dispatch({type: 'LOGIN', payload: loginResponse});

            setIsLoading(false);
        }
    }
    return {logIn, isLoading, error};
}
