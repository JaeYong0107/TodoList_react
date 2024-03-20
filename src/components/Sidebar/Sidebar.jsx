
import SidebarItem from '../SidebarItem/SidebarItem';
import './Sidebar.css';

export default function Sidebar() {
    return (
        <nav>
            <div className='todo-list-nav'>
                <ul>
                    <li><SidebarItem /></li>
                    <li><SidebarItem /></li>
                    <li><SidebarItem /></li>
                    <li><SidebarItem /></li>
                    <li><SidebarItem /></li>
                    <li><SidebarItem /></li>
                    <li><SidebarItem /></li>
                </ul>
            </div>
            <button className='nav-button'><img src='다음-icon.svg' /></button>
        </nav>
    )
}