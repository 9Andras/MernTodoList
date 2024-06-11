import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Navbar from "./components/running elements/Navbar";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import WelcomePage from "./pages/WelcomePage";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/running elements/Footer";

function App() {
    const { user } = useAuthContext();

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="pages">
                    <Routes>
                        <Route
                            path="/"
                            element={user ? <Homepage /> : <WelcomePage />}
                        />
                        <Route
                            path="/login"
                            element={!user ? <Login /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/register"
                            element={!user ? <SignUp /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/*"
                            element={<ErrorPage />}
                        />
                    </Routes>
                </div>
            </BrowserRouter>
            <Footer />
        </div>
    );
}

export default App;
