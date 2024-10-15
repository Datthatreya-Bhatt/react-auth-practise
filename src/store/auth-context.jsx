import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = JSON.parse(localStorage.getItem('token'));
  const [token, setToken] = useState(initialToken?.token);

  const userLoggedIn = !!token;

  function autoLogout(){
    const token = JSON.parse(localStorage.getItem('token'));
    if(token?.time + 300000 < Date.now() ){
      console.log(token.time, token.time < Date.now()+300000)
      localStorage.removeItem('token');
    }
    setTimeout(()=>{
      localStorage.removeItem('token')
    }, 50000)
    
  }


  const loginHandler = (token) => {
    setToken(token);
    const obj = {token, time: Date.now()};
    localStorage.setItem('token', JSON.stringify(obj));
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };
  autoLogout();

  const contextValue = {
    token: token,
    isLoggedIn: userLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
