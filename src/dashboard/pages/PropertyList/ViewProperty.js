import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import {
  FaArrowUp,
  FaBed,
  FaBath,
  FaCar,
  FaChartArea,
  FaLandmark,
  FaSquare,
} from "react-icons/fa";
import Carousel from "react-bootstrap/Carousel";

import axios from "axios";
import { Button, Modal } from "antd";

import "./ViewProperty.css";

function ViewProperty() {
  const [property, setProperty] = useState({});
  const [images, setImages] = useState([]);
  const [clickedImage, setClickedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const { id } = useParams();
  // alert(id);
  const regex = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`http://localhost:5000/property/${id}`);
      console.log(data.at(0));
      setImages(data[0].images);
      setProperty(data.at(0));
      console.log(property);
    };

    fetchData();
    console.log(property);
    console.log(images);
  }, []);

  const handleImageClick = () => {
    // setClickedImage(image);
    setIsModalOpen(true);
    console.log("true1");
    console.log(isModalOpen);
  };

  const renderImages = () => {
    if (images.length > 0) {
      const firstImage = images[0];
      const remainingImages = images.slice(1);
      const remainingCount = images.length - 3;

      return (
        <div className="image-gallery" onClick={handleImageClick}>
          <div className="first-image">
            <img
              src={`http://localhost:5000/${firstImage}`}
              alt={firstImage.alt}
            />
          </div>
          <div className="remaining-images">
            {remainingImages.slice(0, 2).map((image, index) => (
              <div key={index} className="additional-image">
                <img
                  src={`http://localhost:5000/${image}`}
                  alt={image.alt}

                // style={{ pointerEvents: 'auto' }}
                />
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="additional-count">+{remainingCount}</div>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>
        <div>
          <div class="">
            <div className="cardcontainer">
              <div class="col-lg-12 col-md-6">
                <div class="property-item">
                  <div class="position-relative overflow-hidden">
                    {renderImages()}

                    <Modal
                      // title="Property Details"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      width={750}
                      bodyStyle={{
                        height: "auto",
                        
                        marginLeft: "0px",
                        paddingLeft: "0px",

                      }}
                      okText={"Add"}
                      cancelText={"Back"}
                      footer={null}
                    >
                      <div className="slider">
                        <Carousel>
                          {images.map((image) => {
                            return (
                              <Carousel.Item>
                                <img className="d-block w-100" src={`http://localhost:5000/${image}`} alt="items images" />
                              </Carousel.Item>
                            );
                          })}
                        </Carousel>
                        {/* {images.map((image, index) => (

                          <img
                            key={index}
                            src={`http://localhost:5000/${image}`}
                            alt={image.alt}
                          />
                        ))} */}
                      </div>

                      {/* <Collapse
                                size="large"
                                 onChange={onChange}
                                width={700}
                                style={{
                                  marginTop: "100px",
                                  marginLeft: "0px",
                                  paddingLeft: "0px",
                                }}
                              >
                              
                              </Collapse> */}
                    </Modal>

                    <div style={{ display: "flex" }}>
                      <div class="propertypurpose">
                        <h1>
                          {" "}
                          {property?.propertytitle} in{" "}
                          {property?.propertylocation}
                        </h1>
                      </div>
                      <div className="call-button">
                        <Link to="tel:0300000000000">
                          <button
                            id="buttonforcall"
                            className="btn btn-primary"
                          >
                            Call
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="propertysize">
                      <p>
                        <FaLandmark className="feature-icon" color="#2E307D" />
                        {property?.propertysize}
                        {property?.propertysizetype}
                      </p>
                      <p style={{ paddingLeft: "20px" }}>
                        <FaSquare className="feature-icon" color="#2E307D" />
                        {property?.propertysubtype}
                      </p>
                    </div>
                    <div class="feature">
                      <h5>Features</h5>
                      <ul className="property-features">
                        <li>
                          <FaBed className="feature-icon" color="#2E307D" />{" "}
                          {property?.propertynoofbedroom} Bedrooms
                        </li>
                        <li>
                          <FaBath className="feature-icon" color="#2E307D" />{" "}
                          {property?.propertynoofbathroom} Bathrooms
                        </li>
                        <li>
                          <FaCar className="feature-icon" color="#2E307D" />{" "}
                          {property?.propertynoofcarparking} Car Parking
                        </li>
                      </ul>
                    </div>
                    <div class="propertyprice">
                      <h5 class="propertypriceheading">
                        Rs. {property?.propertyprice}
                      </h5>
                    </div>
                    <hr />
                    <div class="propertydescription">
                      <h3>Description</h3>
                      {property?.propertydescription}
                    </div>
                    <hr />
                    <div>
                      <h3>Details</h3>
                      {/* <div>
                                {property?.propertyPrimaryDetaile.length > 0 && (
                                  property?.propertyPrimaryDetaile?.map((detail) => (
                                  <Chip
                                    label={`${detail.detailType} ${detail.detailTypeCount}`}
                                    style={{ backgroundColor: "#2E307D", color: "#ffffff", padding: "20px", marginRight: "10px", marginBottom: "10px", borderRadius: "10px" }}

                                    
                                  />
                                )))}
                                {property?.propertySecondaryDetaile.length > 0 && (property?.propertySecondaryDetaile?.map((detail) => (
                                  <Chip
                                    label={detail}
                                    style={{ backgroundColor: "#2E307D", color: "#ffffff", padding: "20px", marginRight: "10px", marginBottom: "10px", borderRadius: "10px" }}

                                    
                                  />
                                )))}
                                {property?.propertyServices.length > 0 && (property?.propertyServices?.map((service) => (
                                  <Chip
                                    label={service}
                                    style={{ backgroundColor: "#2E307D", color: "#ffffff", padding: "20px", marginRight: "10px", marginBottom: "10px", borderRadius: "10px" }}

                                    
                                  />
                                )))}
                                {property?.propertyEntertainment.length > 0 && (property?.propertyEntertainment?.map(
                                  (entertainmentService) => (
                                    <Chip
                                      label={entertainmentService}
                                      style={{ backgroundColor: "#2E307D", color: "#ffffff", padding: "20px", marginRight: "10px", marginBottom: "10px", borderRadius: "10px" }}

                                     
                                    />
                                  )
                                ))}
                                {property?.propertyNearByLandmarks.length > 0 && (property?.propertyNearByLandmarks?.map(
                                  (nearByLandmarks) => (
                                    <Chip
                                      label={nearByLandmarks}
                                      style={{ backgroundColor: "#2E307D", color: "#ffffff", padding: "20px", marginRight: "10px", marginBottom: "10px", borderRadius: "10px" }}

                                      
                                    />
                                  )
                                ))}
                              </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* - Property List End --> */}

        {/* - Footer Start --> */}
        {/* <Footer /> */}
        {/* - Footer End --> */}

        {/* - Back to Top --> */}
        <a href="/" class="btn btn-lg btn-primary btn-lg-square back-to-top">
          <i class="bi bi-arrow-up">
            <FaArrowUp />
          </i>
        </a>
      </div>
    </div>
  );
}

export default ViewProperty;
