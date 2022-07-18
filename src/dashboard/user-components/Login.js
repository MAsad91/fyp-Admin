import React, { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import Signup from "./Signup";
import ErrorModal from "../shared/ErrorModal";
import { AuthContext } from "../shared/auth-context";
import { Form } from "antd";
import styles from "../user-components/FormStyling.module.css";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal
          error={error}
          errorTitle="An Error Occurred!"
          onClear={errorHandler}
        />
      )}
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Login Required</h2>
        </div>
        <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          onFinish={async (value) => {
            try {
              const response = await axios({
                method: "post",
                url: "http://localhost:5000/auth/login",
                data: {
                  email: value.email,
                  password: value.password,
                },
              });
              console.log(response);
              const statusCode = response.status;
              if (statusCode === 200) {
                navigate("/");
              }
              auth.login(response.data.userId, response.data.token);
            } catch (err) {
              const message = err.response.data.message;
              console.log(message);
              setError(message || "Something went wrong,Please try again!");
              console.log(err.response.data.message, err.response.status);
            }
          }}
        >
          <div className={styles["form-control"]}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please Enter your Email",
                },
                {
                  type: "email",
                  message: "Please enter valid email",
                },
              ]}
              hasFeedback
            >
              <input type="email" id="email" placeholder="Enter Your Email" />
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
                {
                  min: 7,
                },
              ]}
              hasFeedback
            >
              <input
                type="password"
                idd="password"
                placeholder="Enter Your Password"
              />
            </Form.Item>
          </div>
          <div className={styles["form-actions"]}>
            <Form.Item>
              <button>Login</button>
            </Form.Item>
          </div>
        </Form>

        <div>
          <p>Not a member?</p>
          <Link to="/signup">SignUp</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
