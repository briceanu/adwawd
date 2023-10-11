import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './index.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import Todos from './components/todos/Todos';
import NotFoundPage from './components/NotFoundPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Navbar />}>
      <Route index element={<Home />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/todos' element={<Todos />} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
