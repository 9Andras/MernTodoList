import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

function Navbar() {

    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <div className="navbar">
                <Link to="/">
                    <h1>Task Forge</h1>
                </Link>
                <nav>
                    {user ? (
                        <div className="user-info">
                            <span>{user.user.userName}</span>
                            <button
                                className="login-out"
                                onClick={handleClick}>Log out
                            </button>

                        </div>
                    ) : (
                        <div>
                            <Link to="/login" className="login">
                                <button
                                    className="login-out"
                                    type="button">Login
                                </button>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
