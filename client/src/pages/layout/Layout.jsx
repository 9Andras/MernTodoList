import {Link, Outlet} from "react-router-dom";
import UserLogin from "../../components/user/UserLogin";
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
            </ul>
        </nav>
        <UserLogin/>
        <Outlet/>
    </div>
);

export default Layout;
