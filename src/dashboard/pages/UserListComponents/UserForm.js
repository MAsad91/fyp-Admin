import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../shared/auth-context";
import ErrorModal from "../../shared/ErrorModal";
import { Form, Button, Upload } from "antd";
import axios from "axios";
import styles from "../../user-components/FormStyling.module.css";

const UserEditForm = () => {
  // 
//   const [userData, setUserData]=useState({
//     name:"",
//     email:"",
//     contactno:"",
//     address:""
// });
  const [error, setError] = useState(false);
  // const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const {id} = useParams();

  const errorHandler = () => {
    setError(null);
  };

  // const {name, email, contactno, address} = userData;
  //   const onInputChange = e => {
  //       setUserData({ ...userData, [e.target.name]: e.target.value});
  //   };

  // useEffect(() =>{
  //   const LoadUserData = async() => {
  //     const result = await axios.get(`http://localhost:5000/userlist/${id}`);
  //     setUserData(result.data[0]);
  //     console.log(result.data[0]);
  //     // setUser(data);
  //   }
  //   LoadUserData();
    
  // },[])
  // console.log(userData);
let data;
  

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
              // let formData = new FormData();
              // formData.append("name", value.name);
              // formData.append("Email", value.email);
              // formData.append("Contact No.", value.contactno);
              // formData.append("Address", value.address);
              // let userData = {};
              // formData.forEach(function(value, key){
              //     userData[key] = value;
              // });
              // formData.append("creator", auth.userId);
              const response = await axios({
                method: "patch",
                url: `http://localhost:5000/userlist/user/${id}`,
                data: {
                  name: value.name,
                  email: value.email,
                  contactno: value.contactno,
                  address:value.address,
                },
                headers: {
                  // "Content-Type": "multipart/form-data",
                  // Authorization: "Bearer " + auth.token,
                },
                
              });
              
              // console.log(userData);
              console.log(response);
              if (response.status === 200) {
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
                  min: 5,
                },
              ]}
              hasFeedback
            >
              <input type="text" id="name" placeholder="Enter User's Name" 
              // value={userData.name} 
              // onChange={e => onInputChange(e)}
              />
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="email"
              label="Email"

              hasFeedback
            >
              <input
                type="email"
                id="email"
                placeholder="Enter User's Email" 
                //value={userData.email}
                // onChange={e => onInputChange(e)}
              />
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="contactno"
              label="Contact No."
              rules={[
                {
                  min: 11,
                  max: 11,
                },
              ]}
              hasFeedback
            >
              <input
                type="tel"
                id="tel"
                placeholder="Enter Contact No."
                //value={userData.contactno}
                // onChange={e => onInputChange(e)}
              />
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="address"
              label="User's Address"
              rules={[
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
                //value={userData.address}
                // onChange={e => onInputChange(e)}
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
