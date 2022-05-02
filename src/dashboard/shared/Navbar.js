import React, {Fragment} from 'react';
import { Layout, Menu } from 'antd';
import {Link, Route, Router} from 'react-router-dom';
// import './Navbar.css';
import { MenuItem } from '@material-ui/core';
const {Sider } = Layout;
//show sidebar


function Navbar() {
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
            <h5>Save City Services</h5>
          </div>
          <Menu theme="dark" mode="inline">
            <Menu.Item key='1'>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key='2'>
                <Link to="/userlist">UserList</Link>
            </Menu.Item>
            <Menu.Item key='3'>

                <Link to="/crimereport">Crime Report</Link>
              
            </Menu.Item >
            <Menu.Item key='4'>
                <Link to="/safelifereport">Safe Life Report</Link>
              
            </Menu.Item>
            <Menu.Item key='5'>

                <Link to="/lostfoundreport">Lost Found Item Report</Link>
            </Menu.Item>
            <Menu.Item key='6'>
                <Link to="/communityservices">
                Community Services
                </Link>
            </Menu.Item>
            <Menu.Item key='7'>
                <Link to="/certificatepermits">
                Certificate And Permits
                </Link>
            </Menu.Item>
            <Menu.Item>
             LogOut
            </Menu.Item>
          </Menu>
        </Sider>
      </Fragment>
  )
}

export default Navbar;

