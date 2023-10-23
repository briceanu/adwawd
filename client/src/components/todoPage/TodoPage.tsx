import style from '../../style/todo/todoPage.module.scss';
import TodoWrapper from './TodoWrapper';
import UserComponent from './UserComponent';

const TodoPage = () => {
  return (
    <div className={style.todoPage}>
      <UserComponent />
      <TodoWrapper />
    </div>
  );
};

export default TodoPage;
