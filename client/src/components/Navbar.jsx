import {Link} from "react-router-dom";
import {useLogout} from "../hooks/useLogout";
import {useAuthContext} from "../hooks/useAuthContext";

function Navbar() {

    const {logout} = useLogout();
    const {user} = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <nav>
            <ul>
                <li className="grow">
                    <Link to="/">
                        HOME
                    </Link>
                </li>
                {user ? (
                    <div className="user-info">
                        <li>
                            {user.userName}
                        </li>
                        <li>
                            <button onClick={handleClick}>Log out</button>
                        </li>
                    </div>
                ) : (
                    <li>
                        <Link to="/login">
                            <button type="button">Login</button>
                        </Link>
                    </li>
                )}
            </ul>

        </nav>
    );
}

export default Navbar;
