import React, {Fragment, useContext} from 'react';
import { Layout, Menu } from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../shared/auth-context';

const {Sider } = Layout;


function Navbar() {
  const Navigate = useNavigate();
  const auth = useContext(AuthContext);

  const logoutHandler = () => {
    auth.logout();
    Navigate("/login");
  };
    return (
      <Fragment>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo">
            <h5>Safe City Services</h5>
          </div>
          <Menu theme="dark" mode="inline">
            <Menu.Item key='1'>
                <Link to={`/`}>Home</Link>
            </Menu.Item>
            <Menu.Item key='2'>
                <Link to={`/userlist`}>UserList</Link>
            </Menu.Item>
            <Menu.Item key='3'>
                <Link to={`/crimereport`}>Crime Reports</Link>
            </Menu.Item >
            <Menu.Item key='4'>
                <Link to={`/safelifereport`}>Save Life Reports</Link>
            </Menu.Item>
            <Menu.Item key='5'>
                <Link to={`/lostreport`}>Lost Item Reports</Link>
            </Menu.Item>
            <Menu.Item key='6'>
                <Link to={`/foundreport`}>Found Item Reports</Link>
            </Menu.Item>
            <Menu.Item key='7'>
              <Link to={`/communityservices`}>
                Community Services
              </Link>
            </Menu.Item>
            <Menu.Item key='8'>
              <Link to={`/certificatepermits`}>
                Certificate & Permits
              </Link>
            </Menu.Item>
            <Menu.Item key='9'>
              <Link to={`/events`}>
                Events
              </Link>
            </Menu.Item>
            <Menu.Item key='10'>
              <Link to onClick={logoutHandler}>LogOut</Link>
            </Menu.Item>
          </Menu>
        </Sider>
      </Fragment>
  )
}

export default Navbar;

