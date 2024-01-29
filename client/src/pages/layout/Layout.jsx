import {Link, Outlet} from "react-router-dom";
import "./Layout.css"

function Layout() {

    return (
        <>
            <div className="Layout">
                <nav>
                    <ul>
                        <li className="grow">
                            <Link to="/">HOME</Link>
                        </li>
                        <li>
                            <Link to="/login">
                                <button type="button">Login</button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/register">
                                <button type="button">Register</button>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Outlet/>
            </div>
        </>
    );

}

export default Layout;
