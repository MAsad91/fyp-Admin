import React, { Fragment, useState } from "react";

import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import styles from "./Side.module.css";
import Navigation from "./Navigation";

const Side = () => {
  // The drawer is invisible by default
  const [isVisible, setIsVisible] = useState(false);

  // trigger this function to open the drawer
  const showDrawer = () => {
    setIsVisible(true);
  };

  // close the drawer
  const closeDrawer = () => {
    setIsVisible(false);
  };

  return (
    <Fragment>
      <nav style={styles.nav}>
        <Button shape="circle" style={styles.button} onClick={showDrawer}>
          <MenuOutlined />
        </Button>
      </nav>
      <Drawer visible={isVisible} onClose={closeDrawer} placement="left">
        <Navigation />
      </Drawer>
    </Fragment>
  );
};

export default Side;