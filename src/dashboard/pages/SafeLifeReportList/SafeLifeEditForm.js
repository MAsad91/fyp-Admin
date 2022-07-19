import React, { Fragment, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Upload } from "antd";
import ErrorModal from "../../shared/ErrorModal";
import styles from "../../user-components/FormStyling.module.css";
import axios from "axios";
import { Modal } from "antd";

const SafeLifeEditForm = () => {
  const {id} = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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
              
              const response = await axios({
                method: "patch",
                url: `http://localhost:5000/safelife-report/report/${id}`,
                data:{
                  name: value.name,
                  reporttype: value.reporttype,
                  details: value.details,
                  location: value.location
                },
                headers: {
                  // "Content-Type": "multipart/form-data",
                  // Authorization: "Bearer " + auth.token,
                },
              });
              console.log(response);
              if (response.status === 200) {
                Modal.success({
                  title: "SafeLife Report Submitted Successfully!",
                });
                navigate(`/safelifereport`);
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
                  min: 3,
                },
              ]}
              hasFeedback
            >
              <input type="text" id="location" placeholder="Enter Location" />
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
