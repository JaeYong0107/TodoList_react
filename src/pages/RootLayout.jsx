import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

import LoginModal from "../components/Login/LoginModal.jsx";
import SignUpModal from '../components/Login/SignUpModal.jsx';
import Header from "../components/Header/Header.jsx";

export default function RootLayout() {
    const openLogin = useSelector(state => state.modal.isOpenLogin);
    const openSignUp = useSelector(state => state.modal.isOpenSignUp);
    return (<>
        <SignUpModal open={openSignUp} />
        <LoginModal open={openLogin} />
        <Header />
        <Outlet />
    </>)
}