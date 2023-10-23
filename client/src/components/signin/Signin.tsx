import style from '../../style/signin/singin.module.scss';
import working from '../../assets/working.jpg';
import welcome from '../../assets/welcome.jpg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../signup/Signup';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../apiFunctions';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../AuthContext';
const customId = 'custom-id-yes';

const Signin = () => {
  const showToastSuccessMessage = () => {
    toast("Successfully logedin! You'll be redirected to todos page", {
      toastId: customId,
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'light',
      className: `${style.toast__message__success}`,
    });
  };
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<User>();

  const signIn = useMutation(
    async (userData: User): Promise<void> => {
      await login(userData);
    },
    {
      onSuccess: () => {
        logout();
        setTimeout(() => {
          navigate('/todos');
        }, 5000);
      },
    }
  );

  const onSubmit: SubmitHandler<User> = async (
    userData: User
  ): Promise<void> => {
    try {
      await signIn.mutateAsync(userData);
      reset();
      setErrorMessage('');
      showToastSuccessMessage();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        setErrorMessage(error.message);
      }
    }
  };
  return (
    <>
      <div className={style.singin__page}>
        <div className={style.content__container}>
          <div className={style.side__card}>
            <h2>Stop wasting your time</h2>
            <img src={working} alt='working' />
            <p>
              Haven't got an account
              <br />
              <a href='signup'>singup</a>
            </p>
            <div className={style.text__container}>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Suscipit quos aspernatur sunt consequatur at. Doloribus quod
                necessitatibus nostrum excepturi nihil!
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <img src={welcome} alt='welcome' />
            <h2>Welcome</h2>
            <p>Signin by filling the information below</p>
            <div className={style.input__wrapper}>
              <input
                type='text'
                placeholder='username'
                {...register('username', { required: 'Username is required' })}
              />
              <p className={style.error}>{errors.username?.message}</p>
            </div>
            <div className={style.input__wrapper}>
              <input
                type='password'
                placeholder='password'
                {...register('password', { required: 'Password is required' })}
              />
              <p className={style.error}>{errors.password?.message}</p>

              {errorMessage && <p className={style.error}>{errorMessage}</p>}
            </div>
            <button
              type='submit'
              disabled={isSubmitting}
              className={style.signin__button}
            >
              {isSubmitting ? ' ' : ' Get Started'}
            </button>
            <p>Don't have an account ?</p>
            <a href='/signup'>Signup</a>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signin;
