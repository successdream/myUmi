import { useState, useCallback } from 'react';
import { history } from 'umi';

export default function useAuthModel(props) {
  const [login, setLogin] = useState(false || localStorage.getItem('login'));

  const signin = useCallback(({ account, password }) => {
    console.log(account, 'account');
    console.log(password, 'password');

    // signin implementation
    // setUser(user from signin API)
    // changeLogin({ isLogin: true });
    setLogin(true);
    localStorage.setItem('login', true);
    history.push('/');
  }, []);

  const signout = useCallback(() => {
    // signout implementation
    // setUser(null)
    // changeLogin({ isLogin: false });
    setLogin(false);
    localStorage.removeItem('login');
    history.push('/login');
  }, []);

  return {
    login,
    signin,
    signout,
  };
}
