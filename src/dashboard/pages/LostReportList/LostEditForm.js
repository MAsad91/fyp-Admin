import React, { Fragment, useContext, useState,  } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { Form, Button, Upload } from "antd";
import { AuthContext } from "../../shared/auth-context";
import ErrorModal from "../../shared/ErrorModal";
import styles from "../../user-components/FormStyling.module.css";
import axios from "axios";

const LostEditForm = () => {
  const {id} = useParams();
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const uploadHandle = ({ fileList }) => {
    setImages(fileList);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Fragment>
      {error && (
        <ErrorModal
          error={error}
          errorTtile="An Error Occurred!"
          onClear={errorHandler}
        />
      )}
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Lost Item Report</h2>
        </div>
        <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          onFinish={async (value) => {
            console.log(value);
            try {
              let formData = new FormData();
              formData.append("name", value.name);
              formData.append("itemname", value.itemname);
              formData.append("state", value.state);
              formData.append("lostitemtype", value.lostitemtype);
              formData.append("color", value.color);
              formData.append("location", value.location);
              formData.append("details", value.details);
              formData.append("description", value.description);
              images.map((image) => {
                formData.append("images", image.originFileObj);
              });
              // formData.append("creator", id);
              const response = await fetch(`http://localhost:5000/lost-report/report/${id}`,{
                method: 'PATCH',
                body: formData ,
                headers: {
                  // 'Content-type': 'application/json; charset=UTF-8',
                  "Content-Type": "multipart/form-data",
                }
              });
           
              console.log(response);
              if (response.status === 200) {
                navigate(`/lostreport`);
              }
            } catch (err) {
              const messsage = err.response.data.message;
              setError(messsage || "Something went wrong,Please try again!");
              console.log(err.response.data.message, err.response.status);
            }
          }}
        >
          <div className={styles["form-control"]}>
            <Form.Item
              name="name"
              label="Reporter Name"
              rules={[
                {
                  min: 3,
                },
              ]}
              hasFeedback
            >
              <input
                type="text"
                id="reportername"
                placeholder="Enter your name"
              />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="itemname"
              label="Lost Item Name"
              rules={[
                {
                  min: 4,
                },
              ]}
              hasFeedback
            >
              <input
                type="text"
                id="itemname"
                placeholder="Enter lost item name"
              />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="state"
              label="State"
              rules={[
                {
                  min: 3,
                },
              ]}
              hasFeedback
            >
              <input
                type="state"
                id="state"
                placeholder="Enter lost item state e.g(new,old)"
              />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="lostitemtype"
              label="Lost Item Type"
              
              hasFeedback
            >
              <select placeholder="Choose Lost item type">
                <option value="">Select</option>
                <option value="electronic">Electronic</option>
                <option value="wallet">Wallet</option>
                <option value="documents">Documents</option>
                <option value="jewelry">Jewelry</option>
                <option value="animals">Animals</option>
                <option value="watches">Watches</option>
                <option value="bagsandluggage">Bags and Luggage</option>
                <option value="childaffairs">Child Affairs</option>
                <option value="others">Others</option>
              </select>
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="color"
              label="Color"
              rules={[
                
                {
                  min: 3,
                },
              ]}
              hasFeedback
            >
              <input
                type="text"
                id="color"
                placeholder="Enter Lost item color"
              />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="location"
              label="Location"
              rules={[
                {
                  min: 4,
                },
              ]}
              hasFeedback
            >
              <input
                type="text"
                id="address"
                placeholder="Enter the address of the Lost"
              />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="details"
              label="Detail"
              rules={[
                {
                  min: 4,
                },
              ]}
              hasFeedback
            >
              <textarea id="detail" placeholder="Enter Lost item detail" />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  min: 15,
                },
              ]}
              hasFeedback
            >
              <textarea
                id="description"
                placeholder="Give as much detail as possible of the Lost item"
              />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="image"
            >
              <Upload.Dragger
                multiple
                accept=".png,.jpg,.jpeg"
                onChange={uploadHandle}
                beforeUpload={() => false}
              >
                Drag files here Or
                <br />
                <Button>Click Upload</Button>
              </Upload.Dragger>
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

export default LostEditForm;
