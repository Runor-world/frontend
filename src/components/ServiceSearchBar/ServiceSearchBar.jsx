import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import FormInputError from "../FormInputError/FormInputError";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import "./ServiceSearchBar.css";
import { getServices } from "../../features/service/serviceSlice";
import { FaMapMarker, FaMapMarkerAlt, FaSearch } from "react-icons/fa";

const ServiceSearchBar = (props) => {
  const getServicesNamesList = (items) => {
    return items.map((item) => item.name);
  };
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      service: "",
      key: "",
    },
    validationSchema: {
      service: Yup.string().required(""),
      key: Yup.string(),
    },
    onSubmit: (values) => {
      console.log(`Searching for ${values.key} in ${values.service}`);
    },
  });

  return (
    <div className="service-search-form-wrapper">
      <form onSubmit={formik.handleSubmit}>
        {/* <div className='form-group'>
              <select
                  id='service'
                  {...formik.getFieldProps('service')}
              >
                {
                  services?.map( service =>{
                    const {_id, name} = service
                    return (
                      <option className='' key={_id}>{name}</option>
                    )
                  })
                }
              </select>
             
            </div> */}

        <div className="form-group relative">
          <input
            id="key"
            type="search"
            placeholder="Name of the service you want"
            {...formik.getFieldProps("key")}
          />
          <FaSearch className="absolute top-3 right-5 text-primary" />
        </div>

        <div className="form-group relative">
          <input
            id="location"
            type="text"
            placeholder="Your location"
            {...formik.getFieldProps("key")}
          />
          <FaMapMarkerAlt className="absolute top-3 right-5 text-primary" />
        </div>
      </form>
    </div>
  );
};

ServiceSearchBar.propTypes = {};

export default ServiceSearchBar;
