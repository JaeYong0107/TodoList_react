import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store';

import './Header.css';

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function openModal() {
        dispatch(modalActions.openModal());
    }

    return (
        <header>
            <Link to='/'>Todo</Link>
            <div className="login">
                <h2 onClick={openModal}>Login</h2>
                <h2>Sign up</h2>
                <button id='addTodo' onClick={() => navigate('edit')}>add Todo</button>
            </div>
        </header >
    )
} 