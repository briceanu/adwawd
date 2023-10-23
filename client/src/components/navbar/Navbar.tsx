import { NavLink, Outlet } from 'react-router-dom';
import woman_working2 from '../../assets/woman_working2.svg';
import HamburgerNavBar from './HamburgerNavBar';
import style from '../../style/navbar/navbar.module.scss';
import { useAuth } from '../AuthContext';
import { useContext } from 'react';
import { RemoveTokenContext } from '../../App';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const removeUser = useContext(RemoveTokenContext);

  return (
    <>
      <nav className={style.nav__bar}>
        <img src={woman_working2} alt='man' />
        <div className={style.links__container}>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? style.active : '')}
          >
            Home
          </NavLink>
          <NavLink
            to='/signup'
            className={({ isActive }) => (isActive ? style.active : '')}
          >
            Sign Up
          </NavLink>
          {isLoggedIn ? (
            <NavLink
              to='/'
              onClick={() => {
                logout();
                removeUser();
              }}
            >
              Log Out
            </NavLink>
          ) : (
            <NavLink
              to='/signin'
              className={({ isActive }) => (isActive ? style.active : '')}
            >
              Sign In
            </NavLink>
          )}
          <NavLink
            to='/todos'
            className={({ isActive }) => (isActive ? style.active : '')}
          >
            Todos
          </NavLink>
        </div>
        <HamburgerNavBar />
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
