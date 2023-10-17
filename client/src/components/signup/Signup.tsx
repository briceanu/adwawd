import { useMutation } from '@tanstack/react-query';
import { saveUser } from '../../apiFunctions';
import style from '../../style/signup/signup.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaKey } from 'react-icons/fa';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
export interface User {
  username: string;
  password: string;
}

const showToastSuccessMessage = () => {
  toast("Your account has been created! You'll be redirect to signin page", {
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

const Signup = () => {
  const navigate = useNavigate();
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<User>({ mode: 'all' });

  const signup = useMutation(async (userData: User): Promise<void> => {
    const { username, password } = userData;
    await saveUser(username, password);
  });
  const onSubmit: SubmitHandler<User> = async (
    formData: User
  ): Promise<void> => {
    try {
      await signup.mutateAsync(formData);
      reset();
      showToastSuccessMessage();
      setIsUsernameEmpty(true);
      setIsPasswordEmpty(true);
      setErrorMessage('');
      setTimeout(() => {
        navigate('/signin');
      }, 5000);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        console.error('Error:', error.message);
      }
    }
  };

  const handleUsernameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = event.target.value.trim();
    // Remove whitespace characters
    const usernameNotValid = trimmedValue.replace(/\s/g, '');
    if (usernameNotValid.length >= 4 && usernameNotValid.length <= 20) {
      setIsUsernameEmpty(false);
    } else {
      setIsUsernameEmpty(true);
    }
  };
  const handlePasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = event.target.value;
    if (/^(?=.*\d)(?=.*\W)(?=.*[A-Z])(?=.*[a-z]).*$/.test(passwordValue)) {
      setIsPasswordEmpty(false);
    } else {
      setIsPasswordEmpty(true);
    }
  };

  return (
    <>
      <div className={style.singup__page}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Sing up</h2>

          <div
            className={`${style.input__wrapper} ${
              !isUsernameEmpty ? style.valid : ''
            }`}
          >
            <input
              type='text'
              {...register('username', {
                required: 'Insert your name',
                minLength: {
                  value: 4,
                  message: 'Username must be at least 4 characters long',
                },

                validate: (value) => {
                  const trimmedValue = value.trim();
                  const nonWhitespaceCharacters = trimmedValue.replace(
                    /\s/g,
                    ''
                  );
                  if (nonWhitespaceCharacters.length < 4) {
                    return 'Please add at least 4 non-whitespace characters';
                  }
                  if (nonWhitespaceCharacters.length > 20) {
                    return 'Please use less than 20 characters';
                  }
                  return true;
                },
              })}
              placeholder='Username'
              onInput={handleUsernameInput}
            />
          </div>
          <p className={style.error}>{errors.username?.message}</p>

          <div
            className={`${style.input__wrapper} ${
              !isPasswordEmpty ? style.valid : ''
            }`}
          >
            <input
              type='password'
              {...register('password', {
                required: 'Insert a password',
                minLength: {
                  value: 4,
                  message: 'Password must be at least 4 characters long',
                },
                maxLength: {
                  value: 20,
                  message: 'Password must be no longer than 20 characters',
                },

                validate: (value) => {
                  if (
                    !/^(?=.*\d)(?=.*\W)(?=.*[A-Z])(?=.*[a-z]).*$/.test(value)
                  ) {
                    return 'Password must contain at least one uppercase letter, one lowercase letter, a non-word character, and a number';
                  }
                  return true;
                },
              })}
              placeholder='Password'
              onInput={handlePasswordInput}
            />
          </div>
          <p className={style.error}>{errors.password?.message}</p>
          {errorMessage && <p className={style.error}>{errorMessage}</p>}

          <button disabled={isSubmitting} type='submit'>
            {isSubmitting ? ' ' : 'Create Account'}
          </button>
          <p>
            Already have an account? <br />
          </p>
          <div>
            <a href='/signin'>Sign In</a>
            <FaKey className={style.react__icon} />
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
