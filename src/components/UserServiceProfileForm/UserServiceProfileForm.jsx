import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./UserServiceProfile.css";
import FormInputError from "../FormInputError/FormInputError";
import FormError from "../FormError/FormError";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUserServiceProfile } from "../../features/profile/profileSlice";

const UserServiceProfileForm = ({ services }) => {
  const navigate = useNavigate();

  const { message } = useSelector((store) => store.profile);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      service: "",
      accountType: "",
    },
    validationSchema: Yup.object({
      service: Yup.string().required("Select service"),
      accountType: Yup.string()
        .min(2, "Must be atlest 2 characters")
        .required("Select account type"),
    }),
    onSubmit: async (values) => {
      // do something on submit

      // const newValues = {...values, service: values.service.map( service => JSON.parse(service))}
      try {
        const res = await dispatch(createUserServiceProfile(values)).unwrap();
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="service-profile-form">
      {/* <h2 className='font-bold text-center'>Configure your account</h2> */}
      <form onSubmit={formik.handleSubmit}>
        <FormError message={message} />
        <div className="form-group">
          <label htmlFor="accountType">Account type</label>
          <select id="accountType" {...formik.getFieldProps("accountType")}>
            <option defaultValue={""} className="text-slate-300">
              ---Select account type---
            </option>
            <option value={"service consumer"}>
              Service consumer (hire only)
            </option>
            <option value={"service man"}>Service man (hire and serve)</option>
            <option value={"business"}>Business (many services)</option>
          </select>
          <FormInputError
            isTouched={formik.touched.accountType}
            errorMessage={formik.errors.accountType}
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstname">Select offered/consumed service</label>
          <select
            className="custom-scrollbar"
            id="service"
            {...formik.getFieldProps("service")}>
            <option defaultValue={""} className="text-slate-300">
              ---Select a service---
            </option>
            {services.map((service) => (
              <option value={service._id} key={service._id}>
                {service.name}
              </option>
            ))}
          </select>

          <FormInputError
            isTouched={formik.touched.service}
            errorMessage={formik.errors.service}
          />
        </div>

        <div className="w-full flex justify-between gap-4 py-4 pb-2">
          <Link
            className="btn-dark bg-slate-800 text-white p-2 rounded-md flex-1"
            to={"/profile"}>
            Not now
          </Link>

          <input
            type="submit"
            value={"Submit"}
            className="btn-primary border-primary bg-primary p-2 rounded-md flex-1 border-2"
          />
        </div>
      </form>
    </div>
  );
};

export default UserServiceProfileForm;
