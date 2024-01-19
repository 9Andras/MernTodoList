import {Link, Outlet} from "react-router-dom";
import "./Layout.css"

const Layout = () => (
    <div className="Layout">
        <nav>
            <ul>
                <li className="grow">
                    <Link to="/">HOME</Link>
                </li>
                <li>
                    <Link to="/addTodo">
                        <button type="button">Add Todo</button>
                    </Link>
                </li>
                <li>
                    <Link to="/login">
                        <button type="button">Login</button>
                    </Link>
                </li>
            </ul>
        </nav>
        <Outlet/>
    </div>
);

export default Layout;
