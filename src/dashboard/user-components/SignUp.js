import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "antd";
import axios from "axios";
import ErrorModal from "../shared/ErrorModal";
import { AuthContext } from "../shared/auth-context";
import { Link } from "react-router-dom";
import styles from "../user-components/FormStyling.module.css";

const Signup = () => {
  const [error, setError] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          error={error}
          errorTitle="An Error Occurred!"
          onClear={errorHandler}
        />
      )}
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Registration</h2>
        </div>
        <Form
          labelCol={{ span: 10 }}
          autoComplete="off"
          onFinish={async (value) => {
            console.log(value);
            try {
              const response = await axios({
                method: "post",
                url: "http://localhost:5000/auth/signup",
                data: {
                  name: value.name,
                  email: value.email,
                  password: value.password,
                  address: value.address,
                  contactno: value.contactno,
                },
              });
              console.log(response);
              const statusCode = response.status;
              if (statusCode === 201) {
                navigate("/");
              }
              auth.login(response.data.userId, response.data.token);
            } catch (err) {
              const message = err.response.data.message;
              setError(message || "Something went wrong,Please try again!");
              console.log(err.response.data.message, err.response.status);
            }
          }}
        >
          <div className={styles["form-control"]}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
                {
                  whitespace: true,
                },
                {
                  min: 3,
                },
              ]}
              hasFeedback
            >
              <input type="name" id="name" placeholder="Enter your Name" />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
                {
                  type: "email",
                  message: "Please enter valid email",
                },
              ]}
              hasFeedback
            >
              <input type="email" id="email" placeholder="Enter your Email" />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                },
                {
                  min: 7,
                },
              ]}
              hasFeedback
            >
              <input
                type="password"
                id="password"
                placeholder="Enter your Password"
              />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="confirmmpassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error("Password does not match!")
                    );
                  },
                }),
              ]}
              hasFeedback
            >
              <input
                type="password"
                id="confirmpassword"
                placeholder="Confirm your Password"
              />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please enter your address",
                },
                {
                  min: 10,
                },
              ]}
              hasFeedback
            >
              <textarea id="address" placeholder="Enter Your Address" />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="contactno"
              label="Contact No"
              rules={[
                {
                  required: true,
                  message: "Please enter your Contact Number",
                },
                {
                  min: 11,
                  max: 11,
                },
              ]}
              hasFeedback
            >
              <input
                type="number"
                id="number"
                placeholder="Enter your Phone Number"
              />
            </Form.Item>
          </div>
          <div className={styles["form-actions"]}>
            <Form.Item>
              <button>Register</button>
            </Form.Item>
          </div>
        </Form>
        <div>
          <p>Already a Member?</p>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;
