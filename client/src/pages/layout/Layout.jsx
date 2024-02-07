import {Outlet} from "react-router-dom";
import "./Layout.css"
import Navbar from "../../components/Navbar";

function Layout() {

    return (
        <>
            <div className="Layout">
                <Navbar/>
                <Outlet/>
            </div>
        </>
    );

}

export default Layout;
