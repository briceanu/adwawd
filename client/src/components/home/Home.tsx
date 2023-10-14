import style from '../../style/home/home.module.scss';
import laptop640 from '../../assets/laptop640.jpg';
import laptop1280 from '../../assets/laptop1280.jpg';
import { PiGearSixFill } from 'react-icons/pi';

const Home = () => {
  return (
    <div className={style.home__container}>
      <h2>A single platform for employee and customer needs</h2>
      <div className={style.home__wrapper}>
        <div className={style.text__wrapper}>
          <h2>The single platform that properly manages your work</h2>
          <p>Transform the way your company schedules its business</p>
          <a href='/signin'>Try for free</a>
          <div>
            <PiGearSixFill
              className={`${style.react__icons__gear} ${style.first__gear}`}
            />
            <PiGearSixFill className={style.react__icons__gear} />
          </div>
        </div>
        <picture>
          <source media='(max-width: 640px)' srcSet={laptop640} />
          <img src={laptop1280} alt='working at desk' />
        </picture>
      </div>
    </div>
  );
};

export default Home;
