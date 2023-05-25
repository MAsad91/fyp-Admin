import React, { useState, useContext, useEffect } from "react";
import { FaBed, FaBath, FaCar, FaMapMarkerAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AddProperty.css";
import Carousel from "react-bootstrap/Carousel";
import { Modal, Collapse, Switch } from "antd";
import axios from "axios";
import { Formik, isEmptyArray } from "formik";

import Chip from "@material-ui/core/Chip";

import { Upload } from "antd";

const { Panel } = Collapse;

function AddProperty() {
  const regex = /^((\+92)?(0092)?(92)?(0)?)(3)([0-9]{9})$/gm;
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/property/single/${id}`
        );
        setProperty(data[0]);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
    console.log(property);
  }, []);

  const randomNumber = Math.floor(Math.random() * new Date().getTime());
  const onChange = (key) => {
    console.log(key);
  };
  const navigate = useNavigate();
  const byear = new Date().getFullYear() - 20;
  const years = Array.from(new Array(20), (val, index) => index + byear);

  const [propertyImages, setPropertyImages] = useState([]);
  useEffect(() => {
    if (property?.images) {
      setPropertyImages(property?.images);
    }
  }, [property?.images]);
  console.log(propertyImages);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [defaultImage, setDefaultImage] = useState(null);
  const [selectedPrimaryValue, setSelectedPrimaryValue] = useState("");
  const [selectedCountValue, setSelectedCountValue] = useState("");
  const parsedArray = property?.propertyPrimaryDetaile?.map((item) =>
    JSON.parse(item)
  );
  const [selectedPrimaryValuesArray, setSelectedPrimaryValuesArray] = useState(
    []
  );
  const [isParsedArraySet, setIsParsedArraySet] = useState(false);
  console.log(parsedArray);
  useEffect(() => {
    if (parsedArray && parsedArray.length > 0 && !isParsedArraySet) {
      setSelectedPrimaryValuesArray(parsedArray);
      setIsParsedArraySet(true);
    }
  }, [parsedArray, isParsedArraySet]);
  console.log(selectedPrimaryValuesArray);
  const [selectedSecondaryValue, setSelectedSecondaryValue] = useState("");
  const [selectedSecondaryValuesArray, setSelectedSecondaryValuesArray] =
    useState([]);
  useEffect(() => {
    if (property?.propertySecondaryDetaile) {
      console.log(property?.propertySecondaryDetaile);
      setSelectedSecondaryValuesArray(property?.propertySecondaryDetaile);
    }
  }, [property?.propertySecondaryDetaile]);
  console.log(selectedSecondaryValuesArray);
  const [selectedServiceValue, setSelectedServiceValue] = useState("");
  const [selectedServiceValuesArray, setSelectedServiceValuesArray] = useState(
    []
  );
  useEffect(() => {
    if (property?.propertyServices) {
      console.log(property?.propertyServices);
      setSelectedServiceValuesArray(property?.propertyServices);
    }
  }, [property?.propertyServices]);
  console.log(selectedServiceValuesArray);
  const [selectedEntertainmentValue, setSelectedEntertainmentValue] =
    useState("");
  const [
    selectedEntertainmentValuesArray,
    setSelectedEntertainmentValuesArray,
  ] = useState([]);
  useEffect(() => {
    if (property?.propertyEntertainment) {
      console.log(property?.propertyEntertainment);
      setSelectedEntertainmentValuesArray(property?.propertyEntertainment);
    }
  }, [property?.propertyEntertainment]);
  console.log(selectedEntertainmentValuesArray);

  const [selectedNearbyValue, setSelectedNearbyValue] = useState("");
  const [selectedNearbyValuesArray, setSelectedNearbyValuesArray] = useState(
    []
  );
  useEffect(() => {
    if (property?.propertyNearByLandmarks) {
      console.log(property?.propertyNearByLandmarks);
      setSelectedNearbyValuesArray(property?.propertyNearByLandmarks);
    }
  }, [property?.propertyNearByLandmarks]);
  console.log(selectedEntertainmentValuesArray);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddPrimaryValue = (detailtype, detailtypecount) => {
    if (detailtype !== "") {
      setSelectedPrimaryValuesArray((prevArray) => {
        const existingIndex = prevArray.findIndex(
          (value) => value.detailType === detailtype
        );

        if (existingIndex !== -1) {
          const updatedArray = [...prevArray];
          updatedArray[existingIndex].detailTypeCount = detailtypecount;
          return updatedArray;
        } else {
          return [
            ...prevArray,
            { detailType: detailtype, detailTypeCount: detailtypecount },
          ];
        }
      });

      setSelectedPrimaryValue("");
      setSelectedCountValue("");
    }
  };

  const handleRemovePrimaryValue = (value) => {
    setSelectedPrimaryValuesArray((prevArray) =>
      prevArray.filter((item) => item.detailType !== value.detailType)
    );
  };

  const handleAddSecondaryValue = () => {
    if (selectedSecondaryValue !== "") {
      setSelectedSecondaryValuesArray((prevArray) => [
        ...prevArray,
        selectedSecondaryValue,
      ]);
      setSelectedSecondaryValue("");
    }
  };

  const handleRemoveSecondaryValue = (value) => {
    const updatedArray = selectedSecondaryValuesArray.filter(
      (item) => item !== value
    );
    setSelectedSecondaryValuesArray(updatedArray);
  };
  const handleAddServiceValue = () => {
    if (selectedServiceValue !== "") {
      setSelectedServiceValuesArray((prevArray) => [
        ...prevArray,
        selectedServiceValue,
      ]);
      setSelectedServiceValue("");
    }
  };

  const handleRemoveServiceValue = (value) => {
    const updatedArray = selectedServiceValuesArray.filter(
      (item) => item !== value
    );
    setSelectedServiceValuesArray(updatedArray);
  };
  const handleAddEntertainmentValue = () => {
    if (selectedEntertainmentValue !== "") {
      setSelectedEntertainmentValuesArray((prevArray) => [
        ...prevArray,
        selectedEntertainmentValue,
      ]);
      setSelectedEntertainmentValue("");
    }
  };

  const handleRemoveEntertainmentValue = (value) => {
    const updatedArray = selectedEntertainmentValuesArray.filter(
      (item) => item !== value
    );
    setSelectedEntertainmentValuesArray(updatedArray);
  };
  const handleAddNearbyValue = () => {
    if (selectedNearbyValue !== "") {
      setSelectedNearbyValuesArray((prevArray) => [
        ...prevArray,
        selectedNearbyValue,
      ]);
      setSelectedNearbyValue("");
    }
  };

  const handleRemoveNearbyValue = (value) => {
    const updatedArray = selectedNearbyValuesArray.filter(
      (item) => item !== value
    );
    setSelectedNearbyValuesArray(updatedArray);
  };

  const uploadHandle = ({ fileList }) => {
    if (fileList.length === 0) {
      // If no file is uploaded, set the default image
      fileList.push({ url: "./img/test1.jpg" });
      console.log(fileList);
    }
    // setPropertyImages(fileList);
    propertyImages.push(fileList);
    console.log(propertyImages);
  };
  const handleBeforeUpload = ({ fileList }) => {
    if (fileList.length === 0) {
      // If no file is selected, set the default image
      setDefaultImage("./img/test1.jpg");
      setPropertyImages([{ url: "./img/test1.jpg" }]);
      console.log(propertyImages);
      return false; // Prevent file upload
    }
    // Continue with the file upload
    return true;
  };
  const handleImageClick = () => {
    // setClickedImage(image);
    setIsModalOpen(true);
    console.log("true1");
    console.log(isModalOpen);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDeleteImage = (index) => {
    // Create a copy of the propertyImages array
    const updatedImages = [...propertyImages];
    // Remove the image at the specified index
    updatedImages.splice(index, 1);
    // Update the propertyImages state with the updated array
    setPropertyImages(updatedImages);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <div class=" py-5">
        <div class="container">
          <div className="main">
            <Formik
              initialValues={{
                propertypurpose: property?.propertypurpose,
                propertytype: property?.propertytype,
                propertysubtype: property?.propertysubtype,
                propertysize: property?.propertysize,
                propertysizetype: property?.propertysizetype,
                propertyprice: property?.propertyprice,
                propertytitle: property?.propertytitle,
                propertydescription: property?.propertydescription,
                propertylocation: property?.propertylocation,
                propertybuiltyear: property?.propertybuiltyear,
                permalink: property?.permalink,
                propertynoofbedroom: property?.propertynoofbedroom,
                propertynoofbathroom: property?.propertynoofbathroom,
                propertynoofcarparking: property?.propertynoofcarparking,
                images: property?.images,
                propertyPrimaryDetaile: property?.propertyPrimaryDetaile?.map(
                  (item) => JSON.parse(item)
                ),
                propertySecondaryDetaile: property?.propertySecondaryDetaile,
                propertyServices: property?.propertyServices,
                propertyEntertainment: property?.propertyEntertainment,
                propertyNearByLandmarks: property?.propertyNearByLandmarks,
                numberoffloors: property?.numberoffloors,
                unitfloor: property?.unitfloor,
                name: property?.name,
                phonenumber: property?.phonenumber,
                featured: property?.featured,
                // userId: auth?.userId,
              }}
              validate={(values) => {
                console.log(values);
                const errors = {};
                if (!values.propertypurpose) {
                  errors.propertypurpose = "Property Purpose Required";
                }

                if (!values.propertytype) {
                  errors.propertytype = "Property Type Required";
                }
                if (!values.propertysubtype) {
                  errors.propertysubtype = "Required";
                }
                if (!values.propertysize) {
                  errors.propertysize = "Property Size Required";
                }
                if (values.propertysizetype === "") {
                  errors.propertysizetype = "Size Type Required";
                }
                if (!values.propertyprice) {
                  errors.propertyprice = "Property Price Required";
                }
                if (!values.propertytitle) {
                  errors.propertytitle = "Property Title Required";
                }
                if (!values.propertydescription) {
                  errors.propertydescription = "Property Description Required";
                }
                if (!values.propertylocation) {
                  errors.propertylocation = "Property Location Required";
                }
                if (!values.phonenumber) {
                  errors.phonenumber = "Required";
                } else if (!regex.test(values.phonenumber)) {
                  errors.phonenumber = "Invalid Phone No";
                }
                if (!values.name) {
                  errors.name = "Name Required";
                }
                return errors;
              }}
              onSubmit={async (values, actions) => {
                console.log(values);
                const permalinkstring = values.permalink;

                const formData = new FormData();
                formData.append("propertypurpose", values.propertypurpose);
                formData.append("propertytype", values.propertytype);
                formData.append("propertysubtype", values.propertysubtype);
                formData.append("propertysize", values.propertysize);
                formData.append("propertysizetype", values.propertysizetype);
                formData.append("propertyprice", values.propertyprice);
                formData.append("propertytitle", values.propertytitle);
                formData.append(
                  "propertydescription",
                  values.propertydescription
                );
                formData.append("propertylocation", values.propertylocation);
                formData.append("propertybuiltyear", values.propertybuiltyear);
                formData.append("permalink", values.permalink);

                formData.append(
                  "propertynoofbedroom",
                  values.propertynoofbedroom
                );
                formData.append(
                  "propertynoofbathroom",
                  values.propertynoofbathroom
                );
                formData.append(
                  "propertynoofcarparking",
                  values.propertynoofcarparking
                );
                selectedPrimaryValuesArray.map((detail) => {
                  formData.append(
                    "propertyPrimaryDetaile",
                    JSON.stringify(detail)
                  );
                });
                selectedSecondaryValuesArray.map((detail) => {
                  formData.append(
                    "propertySecondaryDetaile",
                    (values.propertySecondaryDetaile = detail)
                  );
                });

                selectedServiceValuesArray.map((service) => {
                  formData.append(
                    "propertyServices",
                    (values.propertyServices = service)
                  );
                });

                selectedEntertainmentValuesArray.map((entertainment) => {
                  formData.append(
                    "propertyEntertainment",
                    (values.propertyEntertainment = entertainment)
                  );
                });

                selectedNearbyValuesArray.map((nearby) => {
                  formData.append(
                    "propertyNearByLandmarks",
                    (values.propertyNearByLandmarks = nearby)
                  );
                });

                formData.append("numberoffloors", values.numberoffloors);
                formData.append("unitfloor", values.unitfloor);
                formData.append("name", values.name);
                formData.append("phonenumber", values.phonenumber);
                formData.append("propertyaddeddate", values.propertyaddeddate = formattedDate);
                formData.append("featured", (values.featured = false));
                formData.append("userId", values?.userId);
                propertyImages.map((image) => {
                  formData.append("images", image.originFileObj);
                });
                console.log(formData);
                console.log(isLoggedIn);

                try {
                  // console.log(propertyPurpose, propertyType, propertySubType)
                  console.log(values);
                  const response = await axios({
                    method: "post",
                    url: `http://localhost:5000/property/update/${id}`,
                    data: formData,

                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                  });

                  console.log(response);

                  if (response.status === 200) {
                    alert(
                      "Property Added Successfully!",
                      response.data.message
                    );
                    console.log(response.data);
                    navigate(`/`);
                    // Modal.success({
                    //   title: "User Added Successfully!",
                    // });
                    // navigate(`/addproperty`);
                  }
                } catch (err) {
                  const message = err.response.data.message || "error";
                  Error(message || "Something went wrong,Please try again!");
                  console.log(err.response.data.message, err.response.status);
                  // alert(err.response.data.message, err.response.status);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <div>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="edit_property">
                      <div className="form-field propertytype">
                        <label>Select Property Purpose</label>
                        <select
                          name="propertypurpose"
                          placeholder="Choose Property Purpose."
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.propertypurpose}
                        >
                          <option value="">Select</option>
                          <option value="sale">Sell</option>
                          <option value="rent">Rent</option>
                        </select>
                      </div>
                      <div className="form-field propertytype">
                        <label>Select Property Type</label>
                        <select
                          name="propertytype"
                          placeholder="Choose Property Type."
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.propertytype}
                        >
                          <option value="">Select</option>
                          <option value="residential">Residential</option>
                          <option value="plot">Plot</option>
                          <option value="commercial">Commercial</option>
                        </select>
                      </div>
                      <div className="form-field propertytype">
                        <label>Select Property SubType</label>
                        {(() => {
                          if (values.propertytype === "residential") {
                            return (
                              <select
                                name="propertysubtype"
                                placeholder="Choose Property SubType."
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.propertysubtype}
                              >
                                <option value="">Select</option>
                                <option value="house">House</option>
                                <option value="guest house">Guest House</option>
                                <option value="flat">Flat</option>
                                <option value="hostel">Hostel</option>
                                <option value="upper portion">
                                  Upper Portion
                                </option>
                                <option value="lower portion">
                                  Lower Portion
                                </option>
                                <option value="room">Room</option>
                                <option value="farm house">Farm House</option>
                                <option value="pent house">Pent House</option>
                                <option value="hotel suites">
                                  Hotel Suites
                                </option>
                                <option value="basement">Basement</option>
                                <option value="anexe">Anexxe</option>
                              </select>
                            );
                          } else if (values.propertytype === "plot") {
                            return (
                              <select
                                name="propertysubtype"
                                placeholder="Choose Property SubType."
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.propertysubtype}
                              >
                                <option value="">Select</option>
                                <option value="residential plot">
                                  Residential Plot
                                </option>
                                <option value="commercial plot">
                                  Commercial Plot
                                </option>
                                <option value="agricultural land">
                                  Agricultural Land
                                </option>
                                <option value="industrial land">
                                  Industrial Land
                                </option>
                                <option value="plot file">Plot File</option>
                                <option value="farmhouse plot">
                                  Farmhouse Plot
                                </option>
                              </select>
                            );
                          } else if (values.propertytype === "commercial") {
                            return (
                              <select
                                name="propertysubtype"
                                placeholder="Choose Property SubType."
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.propertysubtype}
                              >
                                <option value="">Select</option>
                                <option value="office">Office</option>
                                <option value="shop">Shop</option>
                                <option value="warehouse">Warehouse</option>
                                <option value="factory">Factory</option>
                                <option value="building">Building</option>
                                <option value="gym">Gym</option>
                                <option value="theatre">Theatre</option>
                                <option value="food court">Food Court</option>
                                <option value="hall">Hall</option>
                                <option value="land">Land</option>
                                <option value="plaza">Plaza</option>
                              </select>
                            );
                          } else {
                            return (
                              <select
                                name="propertysubtype"
                                placeholder="Choose Property SubType."
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.propertytype}
                              >
                                <option value="">Select</option>
                              </select>
                            );
                          }
                        })()}
                      </div>
                      <div
                        className="form-field propertysize"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <label>Enter Size</label>

                        <div style={{ display: "flex", width: "100%" }}>
                          <input
                            type="number"
                            class="form-control"
                            required
                            id="propertysize"
                            name="propertysize"
                            placeholder="Enter Size"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.propertysize}
                          />

                          <select
                            name="propertysizetype"
                            style={{
                              color: "#2E307D",
                              borderTopRightRadius: "5px",
                              borderBottomRightRadius: "5px",

                              border: "1px solid #CED4DA",
                            }}
                            placeholder="Choose size type."
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.propertysizetype}
                          >
                            <option value="">Select</option>
                            <option value="Marla">Marla</option>
                            <option value="feet">Feet</option>
                            <option value="yard">Yard</option>
                            <option value="meter">Meter</option>
                            <option value="kanal">Kanal</option>
                          </select>
                        </div>
                        <p style={{ color: "red" }}>
                          {(errors.propertysize &&
                            touched.propertysize &&
                            errors.propertysize) ||
                            (errors.propertysizetype &&
                              touched.propertysizetype &&
                              errors.propertysizetype)}
                        </p>
                      </div>
                      <div className="form-field propertydescription">
                        <label>price</label>
                        <input
                          type="number"
                          class="form-control"
                          id="propertyprice"
                          name="propertyprice"
                          placeholder="Price"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.propertyprice}
                        />
                        <p style={{ color: "red" }}>
                          {errors.propertyprice &&
                            touched.propertyprice &&
                            errors.propertyprice}
                        </p>
                      </div>
                      <div className="form-field ">
                        <label>Title</label>
                        <input
                          type="text"
                          class="form-control"
                          id="propertytitle"
                          name="propertytitle"
                          placeholder="Enter Title"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.propertytitle}
                        />
                      </div>
                      <div className="form-field propertydescription">
                        <label>Description</label>
                        <textarea
                          type="text"
                          rows="7"
                          class="form-control"
                          id="propertydescription"
                          name="propertydescription"
                          placeholder="Description"
                          style={{ height: "200px" }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.propertydescription}
                        ></textarea>
                        <p style={{ color: "red" }}>
                          {errors.propertydescription &&
                            touched.propertydescription &&
                            errors.propertydescription}
                        </p>
                      </div>
                      <div className="form-field propertylocation">
                        <label for="propertylocation">Location:</label>
                        <input
                          type="text"
                          class="form-control"
                          id="propertylocation"
                          name="propertylocation"
                          placeholder="Location"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.propertylocation}
                        />
                        <p style={{ color: "red" }}>
                          {errors.propertylocation &&
                            touched.propertylocation &&
                            errors.propertylocation}
                        </p>
                      </div>

                      <div className="form-field simpledetails">
                        <div className="noofbedroom">
                          <label>No.of Bedrooms</label>
                          <select
                            className="numberofbedroomcounter"
                            name="propertynoofbedroom"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.propertynoofbedroom}
                          >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10+">10+</option>
                          </select>
                        </div>
                        <div className="noofbathroom">
                          <label>No.of Bathrooms</label>
                          <select
                            className="numberofbedroomcounter"
                            name="propertynoofbathroom"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.propertynoofbathroom}
                          >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10+">10+</option>
                          </select>
                        </div>
                        <div className="noofcarparking">
                          <label>No.of Car Parking</label>
                          <select
                            className="numberofbedroomcounter"
                            name="propertynoofcarparking"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.propertynoofcarparking}
                          >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10+">10+</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-field ">
                        <label>Name of Property Owner</label>
                        <input
                          type="text"
                          class="form-control"
                          id="propertytitle"
                          name="propertytitle"
                          placeholder="Enter Title"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                        />
                      </div>
                      <div className="form-field ">
                        <label>Contact of property owner</label>
                        <input
                          type="text"
                          class="form-control"
                          id="phonenumber"
                          name="phonenumber"
                          placeholder="Phone No."
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phonenumber}
                        />
                      </div>
                      <div>
                        <h6>Add Images</h6>
                        <div
                          className="propertyimage"
                          onClick={handleImageClick}
                        >
                          <div style={{ padding: "10px" }}>
                            {propertyImages?.map((image, index) => (
                              <div className="thumbnail-wrapper" key={index}>
                                <img
                                  src={`http://localhost:5000/${image}`}
                                  alt={`Image ${index + 1}`}
                                  className="thumbnail-image"
                                />
                                <button
                                  style={{
                                    padding: "0px",
                                    width: "20px",
                                    height: "20px",
                                    textAlign: "center",
                                    position: "absolute",
                                    transform: "translate(-50%, -50%)",
                                    top: "10%",
                                    left: "84%",
                                  }}
                                  className="delete-button"
                                  onClick={() => handleDeleteImage(index)}
                                >
                                  X
                                </button>
                              </div>
                            ))}
                          </div>

                          <div>
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
                                  {propertyImages?.map((image) => {
                                    return (
                                      <Carousel.Item>
                                        <img
                                          className="d-block w-100"
                                          src={`http://localhost:5000/${image}`}
                                          alt="items images"
                                        />
                                      </Carousel.Item>
                                    );
                                  })}
                                </Carousel>
                              </div>
                            </Modal>
                          </div>
                        </div>
                        <div class="row g-4">
                          <div class="col-md-12">
                            <div class="wow fadeInUp" data-wow-delay="0.5s">
                              <div>
                                <Upload.Dragger
                                  multiple
                                  accept=".png,.jpg,.jpeg"
                                  onChange={uploadHandle}
                                  beforeUpload={handleBeforeUpload}
                                >
                                  {defaultImage ? (
                                    <img
                                      src={defaultImage}
                                      alt="Default"
                                      style={{ width: "100%", height: "100%" }}
                                    />
                                  ) : (
                                    <>
                                      {/* <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                      </p> */}
                                      <p className="ant-upload-text">
                                        Drag file here OR
                                        <br />
                                        <button
                                          className="btn btn-primary py-2"
                                          type="button"
                                        >
                                          Click Upload
                                        </button>
                                      </p>
                                    </>
                                  )}
                                </Upload.Dragger>

                                <br />
                                <br />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-field simpledetails">
                        <div className="noofbedroom">
                          <label>Property Built Year</label>
                          <select
                            className="numberofbedroomcounter"
                            name="propertybuiltyear"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.propertybuiltyear}
                          >
                            <option value="">Select</option>
                            {(() => {
                              return years.map((year, index) => {
                                return (
                                  <option key={`year${index}`} value={year}>
                                    {year}
                                  </option>
                                );
                              });
                            })()}
                          </select>
                        </div>
                      </div>
                      <div className="form-field simpledetails">
                        <div className="noofbedroom">
                          <label>Number of Floors In The Building</label>
                          <select
                            className="numberofbedroomcounter"
                            name="numberoffloors"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.numberoffloors}
                          >
                            <option selected value="">
                              choose
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-field simpledetails">
                        <div className="noofbedroom">
                          <label>Which Floor Is Your Unit On</label>
                          <select
                            className="numberofbedroomcounter"
                            name="unitfloor"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.unitfloor}
                          >
                            <option selected value="">
                              choose
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                          </select>
                        </div>
                      </div>

                      <div className="primarydetails">
                        <h5>primarydetail</h5>
                        <div>
                          {selectedPrimaryValuesArray?.length > 0 &&
                            selectedPrimaryValuesArray?.map((value) => (
                              <Chip
                                label={`${value?.detailTypeCount} ${value?.detailType} `}
                                style={{
                                  backgroundColor: "#2E307D",
                                  color: "#ffffff",
                                  padding: "20px",
                                  marginRight: "10px",
                                  marginBottom: "10px",
                                  borderRadius: "10px",
                                }}
                                onDelete={() => handleRemovePrimaryValue(value)}
                              />
                            ))}
                        </div>
                        <div className="select-row">
                          <select
                            value={selectedPrimaryValue}
                            onChange={(e) =>
                              setSelectedPrimaryValue(e.target.value)
                            }
                            className="select-half-width"
                          >
                            <option value="">Select an option</option>
                            <option value="tv lounge">TvLounge</option>
                            <option value="store room">Store Room</option>
                            <option value="laundry room">Laundry Room</option>
                            <option value="study room">Study Room</option>
                            <option value="dinning room">Dinning Room</option>
                            <option value="drawing room">Drawing Room</option>
                            <option value="powder room">Powder Room</option>
                            <option value="balcony">Balcony</option>
                            <option value="dirty kitchen">Dirty Kitchen</option>
                            <option value="kitchen">Kitchen</option>
                          </select>
                          {(() => {
                            if (selectedPrimaryValue) {
                              return (
                                <select
                                  value={selectedCountValue}
                                  onChange={(e) =>
                                    setSelectedCountValue(e.target.value)
                                  }
                                  className="select-half-width"
                                >
                                  <option value="">Select an option</option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10+">10+</option>
                                </select>
                              );
                            } else {
                              return (
                                <select
                                  value={selectedCountValue}
                                  onChange={(e) =>
                                    setSelectedCountValue(e.target.value)
                                  }
                                  className="select-half-width"
                                >
                                  <option value="">Select an option</option>
                                </select>
                              );
                            }
                          })()}
                          <button
                            className="details"
                            type="button"
                            onClick={() => {
                              handleAddPrimaryValue(
                                selectedPrimaryValue,
                                selectedCountValue
                              );
                            }}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      <div className="primarydetails">
                        <h5>Secondarydetail</h5>
                        <div>
                          {selectedSecondaryValuesArray?.length > 0 &&
                            selectedSecondaryValuesArray?.map((value) => (
                              <Chip
                                label={value}
                                style={{
                                  backgroundColor: "#2E307D",
                                  color: "#ffffff",
                                  padding: "20px",
                                  marginRight: "10px",
                                  marginBottom: "10px",
                                  borderRadius: "10px",
                                }}
                                onDelete={() =>
                                  handleRemoveSecondaryValue(value)
                                }
                              />
                            ))}
                        </div>

                        <div className="select-row">
                          <select
                            value={selectedSecondaryValue}
                            onChange={(e) =>
                              setSelectedSecondaryValue(e.target.value)
                            }
                            className="select-half-width1"
                          >
                            <option value="">Select an option</option>
                            <option value="swimming pool">Swimming Pool</option>
                            <option value="home theatre">Home Theatre</option>
                            <option value="lawn/garden">Lawn / Garden</option>
                            <option value="elevator/lift">
                              Elevator / Lift
                            </option>
                            <option value="servent quarter">
                              Servent Quarter
                            </option>
                            <option value="security staff">
                              Security Staff
                            </option>
                            <option value="corner plot">Corner Plot</option>
                            <option value="rooftop useable">
                              Rooftop Useable
                            </option>
                            <option value="separate entry">
                              Separate Entry
                            </option>
                            <option value="central cooling">
                              Central Cooling
                            </option>
                            <option value="central heating">
                              Central Heating
                            </option>
                            <option value="accessibillity">
                              Accessibillity
                            </option>
                            <option value="semi furnished">
                              Semi Furnished
                            </option>
                            <option value="furnished">Furnished</option>
                          </select>

                          <button
                            className="details"
                            type="button"
                            onClick={handleAddSecondaryValue}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      <div className="primarydetails">
                        <h5>Services</h5>
                        <div>
                          {selectedServiceValuesArray?.length > 0 &&
                            selectedServiceValuesArray?.map((value) => (
                              <Chip
                                label={value}
                                style={{
                                  backgroundColor: "#2E307D",
                                  color: "#ffffff",
                                  padding: "20px",
                                  marginRight: "10px",
                                  marginBottom: "10px",
                                  borderRadius: "10px",
                                }}
                                onDelete={() => handleRemoveServiceValue(value)}
                              />
                            ))}
                        </div>
                        <div className="select-row">
                          <select
                            value={selectedServiceValue}
                            onChange={(e) =>
                              setSelectedServiceValue(e.target.value)
                            }
                            className="select-half-width1"
                          >
                            <option value="">Select an option</option>
                            <option value="water">Water</option>
                            <option value="electricity">Electricity</option>
                            <option value="gas">Gas</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="sewerage">Sewerage</option>
                            <option value="Security">Security</option>
                          </select>

                          <button
                            className="details"
                            type="button"
                            onClick={handleAddServiceValue}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      <div className="primarydetails">
                        <h5>Entertainment</h5>
                        <div>
                          {selectedEntertainmentValuesArray?.length > 0 &&
                            selectedEntertainmentValuesArray?.map((value) => (
                              <Chip
                                label={value}
                                style={{
                                  backgroundColor: "#2E307D",
                                  color: "#ffffff",
                                  padding: "20px",
                                  marginRight: "10px",
                                  marginBottom: "10px",
                                  borderRadius: "10px",
                                }}
                                onDelete={() =>
                                  handleRemoveEntertainmentValue(value)
                                }
                              />
                            ))}
                        </div>
                        <div className="select-row">
                          <select
                            value={selectedEntertainmentValue}
                            onChange={(e) =>
                              setSelectedEntertainmentValue(e.target.value)
                            }
                            className="select-half-width1"
                          >
                            <option value="">Select an option</option>
                            <option value="internet connection">
                              Internet Connection
                            </option>
                            <option value="tv cable">Tv Cable</option>
                          </select>

                          <button
                            className="details"
                            type="button"
                            onClick={handleAddEntertainmentValue}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      <div className="primarydetails">
                        <h5>Near By</h5>
                        <div>
                          {selectedNearbyValuesArray?.length > 0 &&
                            selectedNearbyValuesArray?.map((value) => (
                              <Chip
                                label={value}
                                style={{
                                  backgroundColor: "#2E307D",
                                  color: "#ffffff",
                                  padding: "20px",
                                  marginRight: "10px",
                                  marginBottom: "10px",
                                  borderRadius: "10px",
                                }}
                                onDelete={() => handleRemoveNearbyValue(value)}
                              />
                            ))}
                        </div>
                        <div className="select-row">
                          <select
                            value={selectedNearbyValue}
                            onChange={(e) =>
                              setSelectedNearbyValue(e.target.value)
                            }
                            className="select-half-width1"
                          >
                            <option value="">Select an option</option>
                            <option value="schools">Schools</option>
                            <option value="hospitals">Hospitals</option>
                            <option value="mosque">Mosque</option>
                            <option value="resturant">Resturant</option>
                          </select>

                          <button
                            className="details"
                            type="button"
                            onClick={handleAddNearbyValue}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                      <div className="Submit">
                        <button
                          className="btn btn-primary py-2  action_submit_buttons"
                          type="submit"
                          onClick={() => {}}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProperty;
