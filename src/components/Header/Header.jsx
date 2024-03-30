import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store';

import './Header.css';

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
                <h2 onClick={openLoginModal}>Login</h2>
                <h2 onClick={openSignUpModal}>Sign up</h2>
                <button id='addTodo' onClick={() => navigate('new')}>add Todo</button>
            </div>
        </header >
    )
} 