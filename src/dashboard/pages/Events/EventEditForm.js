import React, { Fragment, useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Upload } from "antd";
import { AuthContext } from "../../shared/auth-context";
import ErrorModal from "../../shared/ErrorModal";
import styles from "../../user-components/FormStyling.module.css";
import axios from "axios";
import EventsForm from "./EventsForm";

const EventEditForm = () => {
  const {id} = useParams();
  const [userData, setUserData]=useState({
    defaultValues: {
      name:'',
      crimetype:'',
      details:'',
      location:''
    }});
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

  useEffect(() => {
    const LoadUserData = async () => {
      const result = await axios.get(
        `http://localhost:5000/events/${id}`
      );
      setUserData(result.data.event);
      console.log(result.data.event);
      // setUser(data);
    };
    LoadUserData();
  }, []);
  console.log(userData.name);
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
              images.map((image) => {
                formData.append("images", image.originFileObj);
              });
              // formData.append("images", images[0].originFileObj);
              // formData.append("creator", auth.userId);
              const response = await axios({
                method: "patch",
                url: `http://localhost:5000/events/${id}`,
                data: formData,
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + auth.token,
                },
              });
              console.log(response);
              if (response.status === 200) {
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
                  required: true,
                  message: "Please enter Event Name",
                },
                {
                  min: 5,
                },
              ]}
              hasFeedback
            >
              <input type="text" id="name" defaultValue={userData.name} />
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
              <select defaultValue={userData.eventtype}>
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
              <textarea id="details" defaultValue={userData.details} />
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
                defaultValue={userData.location}
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
                // maxCount={1}
                // multiple="false"
                multiple
                accept=".png,.jpg,.jpeg"
                onChange={uploadHandle}
                beforeUpload={() => false}
              >
                Drag file here OR
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
}
export default EventEditForm;