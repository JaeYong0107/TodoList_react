import { useDispatch, useSelector } from 'react-redux';
import { sidebarActions } from '../../store';

import SidebarItem from '../SidebarItem/SidebarItem';
import './Sidebar.css';

export default function Sidebar({ todoItems }) {
    const dispatch = useDispatch();
    const isNavOpen = useSelector(state => state.sidebar.open)

    const toggleNav = () => {
        dispatch(sidebarActions.toggleButton());
    };

    return (
        <nav style={{ transform: `translateX(${isNavOpen ? '0%' : '-100%'})` }} id={isNavOpen ? '' : 'nav'}>
            <div className='todo-list-container'>
                <div className='todo-list-nav'>
                    <div>
                        <ul>
                            {todoItems.map((item, index) => (
                                <li key={index}><SidebarItem {...item} /></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <button className='nav-button' onClick={toggleNav}><img src='다음-icon.svg' /></button>
            </div>
        </nav>
    );
}