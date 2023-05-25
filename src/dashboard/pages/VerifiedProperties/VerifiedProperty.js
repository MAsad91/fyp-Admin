import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import "datatables.net-dt/css/jquery.dataTables.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import "antd/dist/antd.css";

const MyDataTable = () => {
  const [property, setProperty] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:5000/property/verified");
      console.log(data);
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
     
    }));

  

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
