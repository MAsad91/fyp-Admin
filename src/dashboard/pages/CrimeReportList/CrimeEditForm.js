import React, { Fragment, useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Upload } from "antd";
import ErrorModal from "../../shared/ErrorModal";
import styles from "../../user-components/FormStyling.module.css";
import axios from "axios";

const CrimeEditForm = () => {
  const { id } = useParams();
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
              const response = await axios({
                method: "patch",
                url: `http://localhost:5000/crime-report/report/${id}`,
                data: {
                  name: value.name,
                  crimetype: value.crimetype,
                  details: value.details,
                  location:value.location,
                },
                headers: {
                  // "Content-Type": "multipart/form-data",
                  // Authorization: "Bearer " + auth.token,
                },
              });
              console.log(response);
              if (response.status === 200) {
                navigate(`/crimereport`);
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
              <input
                type="text"
                id="name"
                placeholder="Enter your Name"
              />
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="crimetype"
              label="Crime Type"
              hasFeedback
            >
              <select>
                <option value="">Select</option>
                <option value="Robbery">Robbery</option>
                <option value="Snatching">Snatching</option>
                <option value="Harassment">Harassment</option>
                <option value="Kidnapping">Kidnapping</option>
                <option value="CyberCrime">CyberCrime</option>
                <option value="Fraud">Fraud</option>
                <option value="Murder">Murder</option>
                <option value="Others">Others</option>
              </select>
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="details"
              label="Crime Details"
              rules={[
                {
                  min: 20,
                },
              ]}
              hasFeedback
            >
              <textarea id="details" placeholder="Enter crime details"/>
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="location"
              label="Crime Location"
              rules={[
                {
                  min: 5,
                },
              ]}
              hasFeedback
            >
              <input type="text" id="location" placeholder="Enter Location"/>
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
