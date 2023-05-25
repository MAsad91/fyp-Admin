import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import "datatables.net-dt/css/jquery.dataTables.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { Switch } from "antd";
import "antd/dist/antd.css";

const MyDataTable = () => {
  const [property, setProperty] = useState([]);
  const [verified, setVerified] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [propertyItems, setPropertyItems] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:5000/property/");
      setProperty(data);
    };
    fetchData();
  }, []);

  if (property.length === 0) {
    return <div>Loading...</div>;
  }

  const mapPropertyData = () =>
    property.map((item) => ({
      id: item.id,
      propertytitle: item.propertytitle,
      propertypurpose: item.propertypurpose,
      propertytype: item.propertytype,
      propertysubtype: item.propertysubtype,
      propertysize: item.propertysize,
      propertyprice: item.propertyprice,
      action: (
        <div className="action-buttons">
          <Link to={`/viewproperty/${item.id}`}>
            <EyeOutlined
              style={{
                color: "green",
                marginRight: 12,
                fontSize: 24,
              }}
            />
          </Link>
          <Link to={`/propertyreport/editpropertyform/${item.id}`}>
            <EditOutlined style={{ color: "blue", fontSize: 24 }} />
          </Link>
          <DeleteOutlined
            onClick={() => handleDelete(item)}
            style={{ color: "red", marginLeft: 12, fontSize: 24 }}
          />
        </div>
      ),
      verified: (
        <Switch
          checked={item.verified}
          onChange={() => handleVerification(item)}
        />
      ),
      featured: (
        <Switch
          checked={item.featured}
          onChange={() => handleFeature(item)}
        />
      ),
    }));

  const handleDelete = (item) => {
    // handle action button click
    console.log("Action button clicked:", item);
  };

  const handleVerification = async (item) => {
    const verified = !item.verified; // Toggle the verified value
  
    try {
      Modal.confirm({
        title: 'Verify Property',
        content: 'Do you want to verify this property?',
        onOk: async () => {
          // Perform the property verification
          const response = await axios.patch(
            `http://localhost:5000/property/verification/${item.id}`,
            { verified }
          );
  
          if (response.status === 200) {
            Modal.success({
              title: 'Property Verified Successfully!',
              content: response.data.message,
              onOk: () => {
                console.log(response.data);
                // Update the switch state
                const updatedItem = { ...item, verified };
                // Update the state or perform any necessary actions with the updatedItem
                const updatedPropertyItems = property.map((prop) =>
                  prop.id === item.id ? updatedItem : prop
                );
                setProperty(updatedPropertyItems);
              },
            });
          }
        },
      });
    } catch (err) {
      const message =
        err.response.data.message || 'Something went wrong, please try again!';
      Error(message);
      console.log(err.response.data.message, err.response.status);
    }
  
    // Handle verification switch button toggle
    console.log('Verification switch toggled:', item);
  };
  
  const handleFeature = async (item) => {
    const featured = !item.featured; // Toggle the featured value
  
    try {
      Modal.confirm({
        title: 'Feature Property',
        content: 'Do you want to feature this property?',
        okText: "Yes",
        cancelText: "No",
        onOk: async () => {
          // Perform the property feature operation
          const response = await axios.patch(
            `http://localhost:5000/property/featured/${item.id}`,
            { featured }
          );
  
          if (response.status === 200) {
            Modal.success({
              title: 'Property Featured Successfully!',
              content: response.data.message,
              onOk: () => {
                console.log(response.data);
                // Update the switch state
                const updatedItem = { ...item, featured };
                // Update the state or perform any necessary actions with the updatedItem
                const updatedPropertyItems = property.map((prop) =>
                  prop.id === item.id ? updatedItem : prop
                );
                setProperty(updatedPropertyItems);
              },
            });
          }
        },
      });
    } catch (err) {
      const message =
        err.response.data.message || 'Something went wrong, please try again!';
      Error(message);
      console.log(err.response.data.message, err.response.status);
    }
  
    // Handle feature switch button toggle
    console.log('Feature switch toggled:', item);
  };
  
  

  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
        sort: "asc",
        width: "70px",
      },
      {
        label: "Title",
        field: "propertytitle",
        sort: "asc",
        width: "300px",
      },
      {
        label: "Purpose",
        field: "propertypurpose",
        sort: "asc",
        width: "200px",
      },
      {
        label: "Type",
        field: "propertytype",
        sort: "asc",
        width: "200px",
      },
      {
        label: "SubType",
        field: "propertysubtype",
        sort: "asc",
        width: "200px",
      },
      {
        label: "Size",
        field: "propertysize",
        sort: "asc",
        width: "200px",
      },
      {
        label: "Price",
        field: "propertyprice",
        sort: "asc",
        width: "200px",
      },
      {
        label: "Action",
        field: "action",
        sort: "disabled",
        width: "150px",
      },
      {
        label: "Verified",
        field: "verified",
        sort: "disabled",
        width: "100px",
      },
      {
        label: "Featured",
        field: "featured",
        sort: "disabled",
        width: "100px",
      },
    ],
    rows: mapPropertyData(),
  };

  const options = {
    searchBox: true,
    searchBoxClass: "form-control",
    searchLabel: "Search",
    searchText: "",
    filterText: "Filter",
    responsive: true,
    responsiveSm: true,
    responsiveMd: true,
    responsiveLg: true,
    responsiveXl: true,
    paginationLabel: ["Previous", "Next"],
  };

  return (
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        fontSize: "18px",
        whiteSpace: "nowrap",
      }}
    >
      <h1>Property Table</h1>
      <MDBDataTable
        id="myDataTable"
        data={data}
        options={options}
        searching={true}
        sortable={true}
        striped
        bordered
        noBottomColumns={true}
      />
    </div>
  );
};

export default MyDataTable;
