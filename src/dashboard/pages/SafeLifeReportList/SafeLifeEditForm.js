import React, { Fragment, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Upload } from "antd";
import { AuthContext } from "../../shared/auth-context";
import ErrorModal from "../../shared/ErrorModal";
import styles from "../../user-components/FormStyling.module.css";
import axios from "axios";

const SafeLifeEditForm = () => {
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
          setError="An Error Occurred!"
          onClear={errorHandler}
        />
      )}
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Safe Life Edit Form</h2>
        </div>
        <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          onFinish={async (value) => {
            console.log(value);
            try {
              let formData = new FormData();
              formData.append("name", value.name);
              formData.append("reporttype", value.reporttype);
              formData.append("details", value.details);
              formData.append("location", value.location);
              images.map((image) => {
                formData.append("images", image.originFileObj);
              });
              formData.append("creator", id);
              const response = await axios({
                method: "post",
                url: "http://localhost:5000/safelife-report/reportform",
                data: formData,
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + auth.token,
                },
              });
              console.log(response);
              if (response.status === 201) {
                navigate(`/safelife-report/${id}`);
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
              <input type="text" id="name" placeholder="Enter your Name" />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="reporttype"
              label="Report Type"
              rules={[
                {
                  required: true,
                  message: "please enter report type",
                },
              ]}
              hasFeedback
            >
              <select placeholder="Choose Report type.">
                <option value="">Select</option>
                <option value="accident">Road Accident</option>
                <option value="fire">Fire</option>
                <option value="treatment">Medical Treatment</option>
                <option value="violence">Violence</option>
                <option value="Abuse">Abuse</option>
                <option value="help">Help</option>
                <option value="others">Others</option>
              </select>
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="details"
              label="Details"
              rules={[
                {
                  required: true,
                  message: "Please enter the report details",
                },
                {
                  min: 20,
                },
              ]}
              hasFeedback
            >
              <textarea id="details" placeholder="Enter Details" />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="location"
              label="Location"
              rules={[
                {
                  required: true,
                  message: "Please enter the location",
                },
                {
                  min: 3,
                },
              ]}
              hasFeedback
            >
              <input type="text" id="location" placeholder="Enter Location" />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="image"
              rules={[
                {
                  required: true,
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
                Drag files here OR
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

export default SafeLifeEditForm;
