import { useState } from 'react';

import SidebarItem from '../SidebarItem/SidebarItem';
import './Sidebar.css';

export default function Sidebar({ todoItems }) {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(prevState => !prevState);
    };

    return (
        <nav style={{ transform: `translateX(${isNavOpen ? '0%' : '-100%'})` }}>
            <div className='todo-list-container'>
                <div className='todo-list-nav'>
                    <div>
                        <ul>
                            {todoItems.map((item) => (
                                <li><SidebarItem {...item} /></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <button className='nav-button' onClick={toggleNav}><img src='다음-icon.svg' /></button>
            </div>
        </nav>
    );
}