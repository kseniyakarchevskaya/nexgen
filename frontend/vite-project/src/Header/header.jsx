import logo from '../assets/Logo.png';
import styles from './header.module.scss';
import { NavLink } from 'react-router-dom';
function Header() {
    return (
        <>
            <header>
                <div className={styles.headervn}>
                    <div>
                        {' '}
                        <img src={logo} alt="Logo" />
                    </div>
                    <nav className={styles.but}>
                        <NavLink
                            to={'/'}
                            className={({ isActive }) =>
                                isActive ? `${styles.active} ${styles.activee}` : ''
                            }
                        >
                            HOME
                        </NavLink>
                        <NavLink to={'/page2'}>SERVICES</NavLink>
                        <NavLink to={'/projects'}>PROJECTS</NavLink>
                        <NavLink to={'/about'}>ABOUT</NavLink>
                        <NavLink to={'/careers'}>CAREERS</NavLink>
                        <NavLink to={'/blog'}>BLOGS</NavLink>
                        <NavLink to={'/contact'}>
                            <button>CONTACT US</button>
                        </NavLink>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Header;
