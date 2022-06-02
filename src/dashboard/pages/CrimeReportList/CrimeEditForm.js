import React, { Fragment, useContext, useState,  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Upload } from "antd";
import { AuthContext } from "../../shared/auth-context";
import ErrorModal from "../../shared/ErrorModal";
import styles from "../../user-components/FormStyling.module.css";
import axios from "axios";

const CrimeEditForm = () => {
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
          errorTitle="An Error Occurred!"
          onClear={errorHandler}
        />
      )}
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Crime Edit Form</h2>
        </div>
        <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          onFinish={async (value) => {
            console.log(value);
            try {
              let formData = new FormData();
              formData.append("name", value.name);
              formData.append("crimetype", value.crimetype);
              formData.append("details", value.details);
              formData.append("location", value.location);
              images.map((image) => {
                formData.append("images", image.originFileObj);
              });
              formData.append("creator", id);
              const response = await axios({
                method: "post",
                url: "http://localhost:5000/crime-report/reportform",
                data: formData,
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + auth.token,
                },
              });
              console.log(response);
              if (response.status === 201) {
                navigate(`/crime-report/${id}`);
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
                  message: "Please enter your Name",
                },
                {
                  min: 3,
                },
              ]}
              hasFeedback
            >
              <input
                type="text"
                id="name"
                placeholder="Enter Crime Reporter Name"
              />
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="crimetype"
              label="Crime Type"
              rules={[
                {
                  required: true,
                  message: "Please enter crime type",
                },
              ]}
              hasFeedback
            >
              <select placeholder="Choose Crime Type">
                <option value="">Select</option>
                <option value="robbery">Robbery</option>
                <option value="snatching">Snatching</option>
                <option value="harassment">Harassment</option>
                <option value="kidnapping">Kidnapping</option>
                <option value="cybercrime">Cyber Crime</option>
                <option value="fraud">Fraud</option>
                <option value="murder">Murder</option>
                <option value="others">Others</option>
              </select>
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="details"
              label="Crime Details"
              rules={[
                {
                  required: true,
                  message: "Please Enter Crime Details",
                },
                {
                  min: 20,
                },
              ]}
              hasFeedback
            >
              <textarea id="details" placeholder="Enter Crime Details" />
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="location"
              label="Crime Location"
              rules={[
                {
                  required: true,
                  message: "Please enter crime location",
                },
                {
                  min: 3,
                },
              ]}
              hasFeedback
            >
              <input
                type="text"
                id="location"
                placeholder="Enter Crime location"
              />
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
                Drag file here OR
                <br />
                <Button>Click Upload </Button>
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

export default CrimeEditForm;
