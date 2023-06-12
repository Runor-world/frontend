import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./ServiceSearchBar.css";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

const ServiceSearchBar = (props) => {
  const getServicesNamesList = (items) => {
    return items.map((item) => item.name);
  };

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
