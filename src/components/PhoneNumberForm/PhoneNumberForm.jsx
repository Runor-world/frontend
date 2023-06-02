import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormWrapper from "../FormWrapper/FormWrapper";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input";
import FormInputError from "../FormInputError/FormInputError";
import { useDispatch, useSelector } from "react-redux";
import FormError from "../FormError/FormError";
import { createUserPhoneNumber } from "../../features/auth/authSlice";

const PhoneNumberForm = ({}) => {
  const { user, message, isLoading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      phoneNumber: user.phoneNumber ?? "",
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string().required("Enter pnone number"),
    }),
    onSubmit: async (values) => {
      dispatch(createUserPhoneNumber(values));
    },
  });

  return (
    <FormWrapper title={"Provide Phone number"} formik={formik}>
      <FormError message={message} />
      <div className="form-group text-black px-2">
        <PhoneInput
          type="text"
          defaultCountry="NG"
          className="flex gap-4"
          id="phoneNumber"
          placeholder="Phone number"
          value={formik.values.phoneNumber}
          {...formik.getFieldProps("phoneNumber")}
          onChange={(value) => {
            formik.getFieldHelpers("phoneNumber").setValue(value);
          }}
        />
        <FormInputError
          isTouched={formik.touched.phoneNumber}
          errorMessage={formik.errors.phoneNumber}
        />
      </div>

      <div className="my-2 w-full">
        <button
          type="submit"
          disabled={isLoading}
          className={`btn-primary ${
            isLoading ? "bg-slate-600" : "bg-primary"
          }  w-full text-white rounded-full`}>
          {isLoading ? message.text : "Submit"}
        </button>
      </div>
    </FormWrapper>
  );
};

PhoneNumberForm.propTypes = {};

export default PhoneNumberForm;
