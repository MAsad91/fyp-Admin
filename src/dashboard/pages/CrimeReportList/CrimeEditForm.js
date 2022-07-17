import React, { Fragment, useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Upload } from "antd";
import { AuthContext } from "../../shared/auth-context";
import ErrorModal from "../../shared/ErrorModal";
import styles from "../../user-components/FormStyling.module.css";
import axios from "axios";

const CrimeEditForm = () => {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [crimeName, setCrimeName] = useState("");
  const [userData, setUserData] = useState({
    // name: "",
    // crimetype: "",
    // details: "",
    // location: "",
  });
  const uploadHandle = ({ fileList }) => {
    setImages(fileList);
  };

  const errorHandler = () => {
    setError(null);
  };
  useEffect(() => {
    const LoadUserData = async () => {
      const result = await axios.get(
        `http://localhost:5000/crime-report/report/${id}`
      );
      setCrimeName(result.data.report.name);
      setUserData({
        name: result.data.report.name,
        crimetype: result.data.report.crimetype,
        details: result.data.report.details,
        location: result.data.report.location,
      });
      console.log(result.data.report);
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
          <h2>Crime Edit Form</h2>
        </div>
        <Form
          initialValues={{
            name: userData.name,
            crimetype: userData.crimetype,
            details: userData.details,
            location: userData.location,
          }}
          
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
              // formData.append("creator", id);
              const response = await axios({
                method: "patch",
                url: `http://localhost:5000/crime-report/report/${id}`,
                data: formData,
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: "Bearer " + auth.token,
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
              // initialValue={userData.name}
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
              
                // defaultValue={crimeName}

                // defaultValue={userData? userData.name: ''}
                // initialvalue={userData.name}
                // defaultValue={userData.name}
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
              <textarea id="details" />
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
              <input type="text" id="location" />
            </Form.Item>
          </div>

          <div className={styles["form-control"]}>
            <Form.Item
              name="image"
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
