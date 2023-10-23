import style from '../../style/todo/todoWrapper.module.scss';
import Todo from './Todo';

const TodoWrapper = () => {
  return (
    <div className={style.todo__wrapper}>
      <h2> Get Things Done!</h2>
      <Todo />
    </div>
  );
};
export default TodoWrapper;

// {
//   "name": "client",
//   "version": "0.1.0",
//   "private": true,
//   "dependencies": {
//     "@fortawesome/free-regular-svg-icons": "^6.4.2",
//     "@fortawesome/free-solid-svg-icons": "^6.4.2",
//     "@fortawesome/react-fontawesome": "^0.2.0",
//     "@tanstack/react-query": "^4.33.0",
//     "@tanstack/react-query-devtools": "^4.33.0",
//     "@testing-library/jest-dom": "^5.17.0",
//     "@testing-library/react": "^13.4.0",
//     "@testing-library/user-event": "^13.5.0",
//     "@types/jest": "^27.5.2",
//     "@types/node": "^16.18.59",
//     "@types/react": "^18.2.31",
//     "@types/react-dom": "^18.2.14",
//     "react": "^18.2.0",
//     "react-dom": "^18.2.0",
//     "react-icons": "^4.11.0",
//     "react-router-dom": "^6.17.0",
//     "react-scripts": "5.0.1",
//     "typescript": "^4.9.5",
//     "web-vitals": "^2.1.4"
//   },
//   "scripts": {
//     "start": "react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
//     "eject": "react-scripts eject"
//   },
//   "eslintConfig": {
//     "extends": [
//       "react-app",
//       "react-app/jest"
//     ]
//   },
//   "browserslist": {
//     "production": [
//       ">0.2%",
//       "not dead",
//       "not op_mini all"
//     ],
//     "development": [
//       "last 1 chrome version",
//       "last 1 firefox version",
//       "last 1 safari version"
//     ]
//   }
// }
