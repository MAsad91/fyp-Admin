import React, { Fragment, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Upload } from "antd";
import { AuthContext } from "../../shared/auth-context";
import ErrorModal from "../../shared/ErrorModal";
import styles from "../../user-components/FormStyling.module.css";
import axios from "axios";

const EventsForm = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const auth = useContext(AuthContext);
  const navigation = useNavigate();

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
          <h2>Event</h2>
        </div>
        <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          onFinish={async (value) => {
            console.log(value);
            try {
              let formData = new FormData();
              formData.append("name", value.name);
              formData.append("eventtype", value.eventtype);
              formData.append("details", value.details);
              formData.append("location", value.location);
              formData.append("images", images[0].originFileObj);
              formData.append("creator", auth.userId);
              const response = await axios({
                method: "post",
                url: "http://localhost:5000/events/eventform",
                data: formData,
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + auth.token,
                },
              });
              console.log(response);
              if (response.status === 201) {
                navigation(`/events`);
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
              label="Event Name"
              rules={[
                {
                  required: true,
                  message: "Please enter Event Name",
                },
                {
                  min: 5,
                },
              ]}
              hasFeedback
            >
              <input type="text" id="name" placeholder="Enter Event Name" />
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="eventtype"
              label="Event Type"
              rules={[
                {
                  required: true,
                  message: "Please enter Event type",
                },
              ]}
              hasFeedback
            >
              <select placeholder="Choose Event Type">
                <option value="">Select</option>
                <option value="concert">Concert</option>
                <option value="seminar">Seminar</option>
                <option value="speakersession">Speaker Session</option>
                <option value="conference">Conference</option>
                <option value="tradeshow">Trade Show</option>
                <option value="expo">Expo</option>
                <option value="sponsorship">Sponsorship</option>
                <option value="others">Others</option>
              </select>
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="details"
              label="Event Details"
              rules={[
                {
                  required: true,
                  message: "Please Enter Event Details",
                },
                {
                  min: 20,
                },
              ]}
              hasFeedback
            >
              <textarea id="details" placeholder="Enter Event Details" />
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="location"
              label="Event Location"
              rules={[
                {
                  required: true,
                  message: "Please enter Event location",
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
                placeholder="Enter Event location"
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

export default EventsForm;
