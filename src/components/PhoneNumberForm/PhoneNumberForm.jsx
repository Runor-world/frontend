import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormWrapper from "../FormWrapper/FormWrapper";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input";
import FormInputError from "../FormInputError/FormInputError";
import { useDispatch, useSelector } from "react-redux";
import FormError from "../FormError/FormError";
import { useAddUserPhoneNumberMutation } from "../../features/api/profileApi";
import { closeModal } from "../../features/modal/modalSlice";
import { clearMessage } from "../../features/profile/profileSlice";

const PhoneNumberForm = () => {
  const dispatch = useDispatch();
  const [addPhoneNumber, { isLoading, isFetching }] =
    useAddUserPhoneNumberMutation();
  const { user } = useSelector((store) => store.auth);
  const { message } = useSelector((store) => store.profile);
  const formik = useFormik({
    initialValues: {
      phoneNumber: user.phoneNumber ?? "",
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string().required("Enter pnone number"),
    }),
    onSubmit: async (values) => {
      try {
        await addPhoneNumber(values);
      } catch (error) {}
    },
  });

  useEffect(() => {
    dispatch(clearMessage());
  }, []);

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

      <div className="my-2 w-full flex gap-2">
        {(message.text === "" || (message.text !== "" && !message.type)) && (
          <button
            type="submit"
            disabled={isLoading}
            className={`btn-primary ${
              isLoading && isFetching ? "bg-slate-600" : "bg-primary"
            }  w-full text-white rounded-full`}>
            {isLoading && isFetching ? "updating.." : "Submit"}
          </button>
        )}
        <button
          className={`btn-dark w-full text-white rounded-full border-2 border-primary`}
          onClick={() => dispatch(closeModal())}>
          {message.text === "" || !message.type ? "Cancel" : "Done"}
        </button>
      </div>
    </FormWrapper>
  );
};

PhoneNumberForm.propTypes = {};

export default PhoneNumberForm;
