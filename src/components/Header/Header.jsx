import './Header.css';
import logo from '../../images/logo.png';
import avatar from '../../images/avatar.png';

export default function Header() {
    return (
        <header className="Header">
            <nav className="Header__nav">
                <picture className="Header__logo__container">
                    <a href="https://infojobs.net">
                        <img src={logo} className="Header__logo" alt="logo" target="_blank" />
                    </a>
                </picture>
                <ul className="Header__nav__list">
                    <li className="Header__nav__item">
                        <a href="#" className="Header__nav__link">Empleo</a>
                        <a href="#" className="Header__nav__link">Mis ofertas</a>
                        <a href="#" className="Header__nav__link">CV</a>
                        <a href="#" className="Header__nav__link">Quién me ve</a>
                        <a href="#" className="Header__nav__link">Infoboard</a>
                    </li>
                </ul>
                <div className="user">
                    <picture className="user__avatar__container">
                        <img src={avatar} alt="Avatar" className="user__avatar"/>
                    </picture>
                    <svg className="user__options" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M18 8.93a.75.75 0 0 0-1.06 0l-4.76 4.75a.31.31 0 0 1-.44 0L7 8.93A.753.753 0 1 0 5.94 10l4.75 4.75a1.81 1.81 0 0 0 2.56 0L18 10a.75.75 0 0 0 0-1.06v-.01z"></path></svg>
                </div>
            </nav>
        </header>
    )
}