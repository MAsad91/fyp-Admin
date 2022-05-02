import React, { useCallback, useContext, UseContext, useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {Layout} from "antd";
import  './App.css';


import Home from './dashboard/pages/Home';
import Crime from './dashboard/pages/CrimeReport';
import SafeLife from './dashboard/pages/SaveLifeReport';
import LostFound from './dashboard/pages/LostFoundReport';
import Community from './dashboard/pages/CommunityReport';
import CertificatesPermits from './dashboard/pages/CertificatesReport';
import UserList from './dashboard/pages/UserList';
import Navbar from './dashboard/shared/Navbar';
import LoggedIn from './dashboard/pages/LoggedIn';
import SignUp from './dashboard/pages/SignedUp';
import { AuthContext } from './dashboard/shared/auth-context';

let logoutTimer;
const {Content, Footer} = Layout; 

function App() {
  const auth = useContext(AuthContext);
  const [token, setToken] = useState(false);
  const [tokenExpirationTime, setTokenExpirationTime] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[userId, setUserId] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    setIsLoggedIn(true);
    setToken(token);
    setUserId(uid);
    const tokenExpirationTime =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationTime(tokenExpirationTime);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationTime.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setToken(null);
    setUserId(null);
    setTokenExpirationTime(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationTime) {
      const remainingTime =
        tokenExpirationTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationTime, logout]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);


    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          userId: userId,
          token: token,
          login: login,
          logout: logout,
        }}
      >
        <React.Fragment>
          {/* {isLoggedIn ? ( */}
            <Layout>
              <Navbar />
              <Layout>
                <Content style={{ margin: "24px 16px 0" }}>
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 360 }}
                  >
                    
                    <Routes>
                      {/* <Route path="/login" exact element={<LoggedIn />} />

                      <Route path="/signup" exact element={<SignUp />} /> */}

                      <Route path="/" exact element={<Home />} />

                      <Route path="/userlist" exact element={<UserList />} />


                      <Route path="/crimereport" exact element={<Crime />} />

                      <Route path="/safelifereport" exact element={<SafeLife />} />

                      <Route path="/lostfoundreport" exact element={<LostFound />} />

                      <Route path="/communityservices" exact element={<Community />} />

                      <Route path="/certificatepermits" exact element={<CertificatesPermits />} />

                      {/* <Route path="*" exact>
                        <Redirect to="/login" />
                    </Route> */}
                    </Routes> 
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  © 2022 Safe City Services.All rights reserved.
                </Footer>
              </Layout>
            </Layout>

          {/* ):(
            <LoggedIn />
          )} */}
            
        </React.Fragment>
      </AuthContext.Provider >
    );
  
}

function AppWrapper(){
  return(
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper;
