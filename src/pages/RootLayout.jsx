import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

import LoginModal from "../components/Login/LoginModal.jsx";
import Header from "../components/Header/Header.jsx";

export default function RootLayout() {
    const open = useSelector(state => state.modal.open);
    console.log(open)
    return (<>
        <LoginModal open={open} />
        <Header />
        <Outlet />
    </>)
}