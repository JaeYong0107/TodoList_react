import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store';

import './Header.css';

export default function Header() {
    const dispatch = useDispatch();

    function openModal() {
        dispatch(modalActions.openModal());
    }

    return (
        <header>
            <Link to='/'>Todo</Link>
            <div className="login">
                <h2 onClick={openModal}>Login</h2>
                <h2>Sign up</h2>
                <button id='addTodo' onClick={openModal}>add Todo</button>
            </div>
        </header>
    )
} 