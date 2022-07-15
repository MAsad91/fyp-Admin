import React, { Fragment, useContext, useState,  } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { Form, Button, Upload } from "antd";
import { AuthContext } from "../../shared/auth-context";
import ErrorModal from "../../shared/ErrorModal";
import styles from "../../user-components/FormStyling.module.css";
import axios from "axios";

const FoundEditForm = () => {
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
          <h2>found Item Report</h2>
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
              formData.append("founditemtype", value.founditemtype);
              formData.append("color", value.color);
              formData.append("location", value.location);
              formData.append("details", value.details);
              formData.append("description", value.description);
              images.map((image) => {
                formData.append("images", image.originFileObj);
              });
              // formData.append("creator", id);
              const response = await axios({
                method: "patch",
                url: `http://localhost:5000/found-report/report/${id}`,
                data: formData,
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + auth.token,
                },
              });
              console.log(response);
              if (response.status === 200) {
                navigate(`/foundreport`);
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
                  required: true,
                  message: "Please enter your name",
                },
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
              label="Found Item Name"
              rules={[
                {
                  required: true,
                  message: "Please enter found item name",
                },
                {
                  min: 4,
                },
              ]}
              hasFeedback
            >
              <input
                type="text"
                id="itemname"
                placeholder="Enter found item name"
              />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="state"
              label="State"
              rules={[
                {
                  required: true,
                  message: "Please enter the state of items",
                },
                {
                  min: 3,
                },
              ]}
              hasFeedback
            >
              <input
                type="state"
                id="state"
                placeholder="Enter found item state e.g(new,old)"
              />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="founditemtype"
              label="found Item Type"
              rules={[
                {
                  required: true,
                  message: "Please enter found item type",
                },
              ]}
              hasFeedback
            >
              <select placeholder="Choose found item type">
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
                  required: true,
                  message: "Please enter the color of item",
                },
                {
                  min: 3,
                },
              ]}
              hasFeedback
            >
              <input
                type="text"
                id="color"
                placeholder="Enter found item color"
              />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="location"
              label="Location"
              rules={[
                {
                  required: true,
                  message: "Please enter item found location",
                },
                {
                  min: 4,
                },
              ]}
              hasFeedback
            >
              <input
                type="text"
                id="address"
                placeholder="Enter the address of the found"
              />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="details"
              label="Detail"
              rules={[
                {
                  required: true,
                  message: "Please enter found item detail",
                },
                {
                  min: 4,
                },
              ]}
              hasFeedback
            >
              <textarea id="detail" placeholder="Enter found item detail" />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
                {
                  min: 15,
                },
              ]}
              hasFeedback
            >
              <textarea
                id="description"
                placeholder="Give as much detail as possible of the found item"
              />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="image"
              rules={[
                {
                  required: false,
                  message: "Please upload image",
                },
              ]}
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

export default FoundEditForm;
