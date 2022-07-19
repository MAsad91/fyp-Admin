import React, { Fragment, useContext, useState,  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "antd";
import ErrorModal from "../../shared/ErrorModal";
import styles from "../../user-components/FormStyling.module.css";
import axios from "axios";
import {Modal} from 'antd';

const RequestServicesForm = () => {
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
          errorTitle="An Error Occured!"
          onClear={errorHandler}
        />
      )}
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Request Services Edit Form</h2>
        </div>
        <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          onFinish={async (value) => {
            console.log(value);
            try {
              const response = await axios({
                method: "patch",
                url: `http://localhost:5000/request-communityservices/report/${id}`,
                data: {
                  name: value.name,
                  servicetype: value.servicetype,
                  details: value.details,
                },
                headers: {
                  // Authorization: "Bearer " + auth.token,
                },
              });
              console.log(response);
              if (response.status === 200) {
                Modal.success({
                  title: "Community Report Submitted Successfully!",
                });
                navigate(`/communityservices`);
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
                  min: 3,
                },
              ]}
              hasFeedback
            >
              <input type="name" id="name" placeholder="Enter your name" />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="servicetype"
              label="Service Type"
              hasFeedback
            >
              <select placeholder="Choose Service Type">
                <option value="">Select</option>
                <option value="homeSecurity">Home Security</option>
                <option value="touristSecurity">Tourists Security</option>
                <option value="eventsSecurity">Events Security</option>
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
              <textarea id="detail" placeholder="Enter Details" />
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

export default RequestServicesForm;
