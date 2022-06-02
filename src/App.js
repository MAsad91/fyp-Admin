import React, { useCallback, useContext, UseContext, useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import {Layout} from "antd";
import  './App.css';


import Home from './dashboard/pages/Home';
import Crime from './dashboard/pages/CrimeReport';
import SafeLife from './dashboard/pages/SaveLifeReport';
import Lost from './dashboard/pages/LostReport';
import Found from './dashboard/pages/FoundReport';
import Community from './dashboard/pages/CommunityReport';
import CertificatesPermits from './dashboard/pages/CertificatesReport';
import UserList from './dashboard/pages/UserListComponents/UserList';
import Navbar from './dashboard/shared/Navbar';
import LoggedIn from './dashboard/pages/LoggedIn';
import SignUp from './dashboard/pages/SignedUp';

import EditUserList from './dashboard/pages/UserListComponents/UserForm';
import ViewUser from './dashboard/pages/UserListComponents/ViewUser';
import Events from './dashboard/pages/Events/Events';
import EventsForm from './dashboard/pages/Events/EventsForm';

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
          {isLoggedIn ? (
            <Layout>
              <Navbar />
              <Layout>
                <Content style={{ margin: "24px 16px 0" }}>
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: 580 }}
                    //before minHeight: 360
                    //minWidth: 1360
                  >
                    
                    <Routes>
                      <Route path="/login" exact element={<LoggedIn />} />

                      <Route path="/signup" exact element={<SignUp />} />

                      <Route path="/" exact element={<Home />} />

                      <Route path={`/userlist`} exact element={<UserList />}/>

                      <Route path='/userlist/userform/:id' exact element={<EditUserList />} />
                      <Route path='/userlist/:id' exact element={<ViewUser />} />

                      <Route path={`/crimereport`} exact element={<Crime />} />

                      <Route path={`/safelifereport`} exact element={<SafeLife />} />

                      <Route path={`/lostreport`} exact element={<Lost />} />

                      <Route path={`/foundreport`} exact element={<Found />} />

                      <Route path={`/communityservices`} exact element={<Community />} />

                      <Route path={`/certificatepermits`} exact element={<CertificatesPermits />} />
                      
                      <Route path={`/events`} exact element={<Events />} />

                      <Route path={`/events/eventform`} exact element={<EventsForm />} />
                      {/* <Route path="*" exact
                      element={<Navigate to="/login" />}/> */}
                    </Routes> 
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  © 2022 Safe City Services.All rights reserved.
                </Footer>
              </Layout>
            </Layout>

          ):(
            // 
            <>
            <Routes>
              <Route path="/login" exact
              element={<LoggedIn />}/>

              <Route path="/signup" exact
              element={<SignUp />}/>

              <Route path="/" exact
              element={<Navigate to="/login" />}/> 

              {/* <Route path="*" exact>
                <Redirect to="/login" />
              </Route> */}
            </Routes>
          </>
          )}
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
