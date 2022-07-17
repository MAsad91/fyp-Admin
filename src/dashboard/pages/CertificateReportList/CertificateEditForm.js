import React, { Fragment, useContext, useState,  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "antd";
import { AuthContext } from "../../shared/auth-context";
import ErrorModal from "../../shared/ErrorModal";
import styles from "../../user-components/FormStyling.module.css";
import axios from "axios";

const RequestEditForm = () => {
  const {id} = useParams();
  const [error, setError] = useState(false);
  const auth = useContext(AuthContext);
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
          <h2> Certificate And Permits Edit Form </h2>
        </div>
        <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          onFinish={async (value) => {
            console.log(value);
            try {
              const response = await axios({
                method: "patch",
                url: `http://localhost:5000/request-certificatepermits/report/${id}`,
                data: {
                  name: value.name,
                  requesttype: value.requesttype,
                  details: value.details,
                },
                headers: {
                  Authorization: "Bearer " + auth.token,
                },
              });
              console.log(response);
              if (response.status === 200) {
                navigate(`/certificatepermits`);
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
              <input type="text" id="name" placeholder="Enter Your Name" />
            </Form.Item>
          </div>
          <div className={styles["form-control"]}>
            <Form.Item
              name="requesttype"
              label="Certificate/Permit"

              hasFeedback
            >
              <select placeholder="Choose Certificate or Permit">
                <option value="">Select</option>
                <option value="certificate">Certificate</option>
                <option value="permit">Permit</option>
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

export default RequestEditForm;
