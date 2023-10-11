import { NavLink } from 'react-router-dom';
import style from '../../style/navbar/hamburgerNavBar.module.scss';

interface UpdataFunction {
  updateMenu: () => void;
  menu_class: string;
}
const SideMenu: React.FC<UpdataFunction> = ({ updateMenu, menu_class }) => {
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
      <NavLink
        onClick={updateMenu}
        to='/signin'
        className={({ isActive }) => (isActive ? style.active : '')}
      >
        Sign In
      </NavLink>
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
