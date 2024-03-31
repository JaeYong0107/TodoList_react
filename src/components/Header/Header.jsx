import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions, modalActions } from '../../store';

import './Header.css';

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, isLogin } = useSelector(state => state.login);

    function openLoginModal() {
        dispatch(modalActions.openLoginModal());
    }

    function openSignUpModal() {
        dispatch(modalActions.openSignUpModal());
    }

    return (
        <header>
            <Link to='/'>Todo</Link>
            <div className="login">
                {isLogin && <>
                    <h4>{currentUser.name}님 반갑습니다.</h4>
                    <h2 onClick={() => dispatch(loginActions.logout())}>Logout</h2>
                </>}
                {!isLogin && <>
                    <h2 onClick={openLoginModal}>Login</h2>
                    <h2 onClick={openSignUpModal}>Sign up</h2>
                </>}
                {isLogin && <button id='addTodo' onClick={() => navigate('new')}>add Todo</button>}
            </div>
        </header >
    )
} 