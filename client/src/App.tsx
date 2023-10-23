import {
  Outlet,
  Route,
  RouteProps,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useNavigate,
} from 'react-router-dom';
import './index.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import TodoPage from './components/todoPage/TodoPage';
import NotFoundPage from './components/NotFoundPage';
import { createContext, useEffect } from 'react';
import { AuthProvider } from './components/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { validateToken } from './apiFunctions';

const popupToastInfo = () => {
  toast('You need to sign in to access this page', {
    toastId: 'your-id',
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'light',
  });
};
//2332###dDDD3
const PrivateRoute = ({ ...rest }: RouteProps): React.ReactElement | null => {
  const access_token = localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    const validateAccessToken = async () => {
      try {
        if (access_token) {
          await validateToken();
        } else {
          popupToastInfo();
          navigate('/');
        }
      } catch (error) {
        popupToastInfo();
        navigate('/');
        console.error(error);
      }
    };

    validateAccessToken();
  });

  if (!access_token) {
    return null;
    // Do not render the protected route if not authenticated
  }
  return (
    <>
      <Outlet />
    </>
  );
};

const removeToken = () => {
  localStorage.removeItem('token');
  return;
};
const RemoveTokenContext = createContext(removeToken);
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/todos' element={<TodoPage />} />
          </Route>
        </Route>
      </>
    )
  );

  return (
    <>
      <AuthProvider>
        <RemoveTokenContext.Provider value={removeToken}>
          <RouterProvider router={router}></RouterProvider>
        </RemoveTokenContext.Provider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export { RemoveTokenContext };
export default App;
