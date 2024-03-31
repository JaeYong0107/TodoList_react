import { Outlet, useLoaderData } from "react-router-dom";
import { useSelector } from 'react-redux';

import LoginModal from "../components/Login/LoginModal.jsx";
import SignUpModal from '../components/Login/SignUpModal.jsx';
import Header from "../components/Header/Header.jsx";
import { getUsersInfo } from "../util/http.js";

export default function RootLayout() {
    const openLogin = useSelector(state => state.modal.isOpenLogin);
    const openSignUp = useSelector(state => state.modal.isOpenSignUp);
    const users = useLoaderData();
    return (<>
        <SignUpModal open={openSignUp} />
        <LoginModal open={openLogin} users={users} />
        <Header />
        <Outlet />
    </>)
}

export async function loader() {
    const users = await getUsersInfo();
    return users;
}