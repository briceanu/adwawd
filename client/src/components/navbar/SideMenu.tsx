import { NavLink } from 'react-router-dom';
import style from '../../style/navbar/hamburgerNavBar.module.scss';
import { useContext } from 'react';
import { RemoveTokenContext } from '../../App';
import { useAuth } from '../AuthContext';

interface UpdataFunction {
  updateMenu: () => void;
  menu_class: string;
}

const SideMenu: React.FC<UpdataFunction> = ({ updateMenu, menu_class }) => {
  const { isLoggedIn, logout } = useAuth();
  const removeUser = useContext(RemoveTokenContext);

  return (
    <div className={`${menu_class} ${style.menu}`}>
      <NavLink
        to='/'
        onClick={updateMenu}
        className={({ isActive }) => (isActive ? style.active : '')}
      >
        Home
      </NavLink>
      <NavLink
        to='/signup'
        onClick={updateMenu}
        className={({ isActive }) => (isActive ? style.active : '')}
      >
        Sign up
      </NavLink>

      {isLoggedIn ? (
        <NavLink
          to='/'
          onClick={() => {
            logout();
            updateMenu();
            removeUser();
          }}
          className={({ isActive }) => (isActive ? style.active : '')}
        >
          Log Out
        </NavLink>
      ) : (
        <NavLink
          to='/signin'
          onClick={() => {
            updateMenu();
          }}
          className={({ isActive }) => (isActive ? style.active : '')}
        >
          Sign In
        </NavLink>
      )}

      <NavLink
        onClick={updateMenu}
        to='/todos'
        className={({ isActive }) => (isActive ? style.active : '')}
      >
        Todos
      </NavLink>
    </div>
  );
};

export default SideMenu;
