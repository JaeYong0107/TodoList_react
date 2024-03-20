import { Link } from 'react-router-dom';

import './Header.css';

export default function Header() {
    return (
        <header>
            <Link to='/'>Todo</Link>
            <div className="login">
                <h2>Logout</h2>
                <h2>Sign up</h2>
            </div>
        </header>
    )
} 