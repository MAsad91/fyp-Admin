import React, { Fragment, useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Upload } from "antd";
import ErrorModal from "../../shared/ErrorModal";
import styles from "../../user-components/FormStyling.module.css";
import axios from "axios";
import { Modal } from "antd";

const EventEditForm = () => {
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
              const response = await axios({
                method: "patch",
                url: `http://localhost:5000/events/${id}`,
                body: {
                  name: value.name,
                  eventtype: value.eventtype,
                  details: value.details,
                  location: value.location,
                },
                headers: {
                  // "Content-Type": "multipart/form-data",
                  // Authorization: "Bearer " + auth.token,
                },
              });
              console.log(response);
              if (response.status === 200) {
                Modal.success({
                  title: "Event Report Submitted Successfully!",
                });
                navigate(`/events`);
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
      
              hasFeedback
            >
              <select>
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
                  min: 20,
                },
              ]}
              hasFeedback
            >
              <textarea id="details" placeholder="Event details"/>
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="location"
              label="Event Location"
              rules={[
                {
                  min: 3,
                },
              ]}
              hasFeedback
            >
              <input
                type="text"
                id="location"
                placeholder="Enter Location"
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
}
export default EventEditForm;