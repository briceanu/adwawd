import { useState } from 'react';
import style from '../../style/navbar/hamburgerNavBar.module.scss';
import SideMenu from '../navbar/SideMenu';

const HamburgerNavBar = () => {
  const [burger__class, setBurgerClass] = useState(
    `${style.burger__bar} ${style.unclicked}`
  );
  const [menu_class, setMenuClass] = useState('menu hidden');
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass(`${style.burger__bar} ${style.clicked}`);
      setMenuClass(`${style.menu} ${style.menu__visible}`);
    } else {
      setBurgerClass(`${style.burger__bar} ${style.unclicked}`);
      setMenuClass(`${style.menu} ${style.menu__hidden}`);
    }
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <div className={style.hamburgerNavBar}>
      <div className={style.burger__menu} onClick={updateMenu}>
        <div className={burger__class}></div>
        <div className={burger__class}></div>
        <div className={burger__class}></div>
      </div>
      <div>
        <SideMenu updateMenu={updateMenu} menu_class={menu_class} />
      </div>
    </div>
  );
};

export default HamburgerNavBar;
