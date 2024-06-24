import { Outlet, NavLink } from "react-router-dom";

const CommonLayout = () => {
    return (
        <>
            <header>
                <NavLink to="/" style={{ color: "black" }}>
                    <h1>Manakan</h1>
                </NavLink>
                <hr />
            </header>
            <Outlet />{/* ルーティングでここが置き換わる */}
        </>
    );
};

export default CommonLayout;