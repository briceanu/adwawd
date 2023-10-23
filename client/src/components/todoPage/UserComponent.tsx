import style from '../../style/todo/user.module.scss';
import working640 from '../../assets/working640.jpg';
import working1280 from '../../assets/working1280.jpg';
import working1920 from '../../assets/working1920.jpg';

const UserComponent = () => {
  return (
    <aside className={style.user__component}>
      <h2>Welcome User</h2>

      <picture>
        <source media='(max-width: 640px)' srcSet={working640} />
        <source media='(max-width: 1280px)' srcSet={working1280} />
        <img src={working1920} alt='working at desk' />
      </picture>

      <p>You have 2 task to do</p>
    </aside>
  );
};

export default UserComponent;
