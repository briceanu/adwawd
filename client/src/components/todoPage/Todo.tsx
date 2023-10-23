import style from '../../style/todo/todo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faCheck,
  faPersonDigging,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

const Todo = () => {
  return (
    <div className={style.todo__container}>
      <p>celan tge table</p>

      <div className={style.icons__container}>
        <FontAwesomeIcon icon={faCheck} />
        <FontAwesomeIcon icon={faPersonDigging} />
        <FontAwesomeIcon icon={faTrash} />
        <FontAwesomeIcon icon={faPenToSquare} />
      </div>
    </div>
  );
};
export default Todo;
