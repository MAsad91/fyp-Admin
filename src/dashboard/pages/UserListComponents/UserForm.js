import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../shared/auth-context";
import ErrorModal from "../../shared/ErrorModal";
import { Form, Button, Upload } from "antd";
import axios from "axios";
import styles from "../../user-components/FormStyling.module.css";

const UserEditForm = () => {
  // 
  const [userData, setUserData]=useState({
    name:"",
    email:"",
    contactno:"",
    address:""
});
  const [error, setError] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const {id} = useParams();
  // alert(id);

  const errorHandler = () => {
    setError(null);
  };

  const {name, email, contactno, address} = userData;
    const onInputChange = e => {
        setUserData({ ...userData, [e.target.name]: e.target.value});
    };

  useEffect(() =>{
    const LoadUserData = async() => {
      const result = await axios.get(`http://localhost:5000/userlist/${id}`);
      setUserData(result.data);
      console.log(result.data);
      // setUser(data);
    }
    LoadUserData();
    
  },[])
  console.log(userData);

  

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
          <h2>User Edit Form</h2>
        </div>
        <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          onFinish={async (value) => {
            console.log(value);
            try {
              let formData = new FormData();
              formData.append("name", value.name);
              formData.append("Email", value.email);
              formData.append("Contact No.", value.contactno);
              formData.append("Address", value.address);
              formData.append("creator", auth.userId);
              const response = await axios({
                method: "PUT",
                url: "http://localhost:5000/userlist/userform",
                data: formData,
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + auth.token,
                },
              });
              console.log(response);
              if (response.status === 201) {
                navigate(`/userlist`);
              }
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
                  message: "Please enter User Name",
                },
                {
                  min: 5,
                },
              ]}
              hasFeedback
            >
              <input type="text" id="name" placeholder="Enter User's Name" value={name} 
              onChange={e => onInputChange(e)}/>
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter Email",
                },
              ]}
              hasFeedback
            >
              <input
                type="email"
                id="email"
                placeholder="Enter User's Email" value={email}
                onChange={e => onInputChange(e)}
              />
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="contactno"
              label="Contact No."
              rules={[
                {
                  required: true,
                  message: "Please Enter Contact No.",
                },
                {
                  min: 11,
                },
              ]}
              hasFeedback
            >
              <input
                type="tel"
                id="tel"
                placeholder="Enter Contact No."
                value={contactno}
                onChange={e => onInputChange(e)}
              />
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="address"
              label="User's Address"
              rules={[
                {
                  required: true,
                  message: "Please enter User's Address",
                },
                {
                  min: 7,
                },
              ]}
              hasFeedback
            >
              <input
                type="text"
                id="address"
                placeholder="Enter User's Address"
                value={address}
                onChange={e => onInputChange(e)}
              />
            </Form.Item>
          </div>
          <div className={styles["form-actions"]}>
            <Form.Item>
              <button style={{ color: "white" }}>Submit</button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default UserEditForm;
