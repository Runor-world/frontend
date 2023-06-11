import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../features/auth/authSlice";
import FormError from "../FormError/FormError";
import "./SignupForm.css";
import FormInputError from "../FormInputError/FormInputError";
import { Link, useLocation, useNavigate } from "react-router-dom";
import googleIcon from "../../images/google-icon.png";
import facebookIcon from "../../images/facebook-icon.png";
import { FaSpinner } from "react-icons/fa";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useRegisterUserMutation } from "../../features/api/authApi";
import { autoTimer } from "../../utils/timer";

const SignupForm = () => {
  let timer = null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((store) => store.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [registerUser] = useRegisterUserMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber: "",
      password: "",
      passwordRepeat: "",
      firstName: "",
      otherName: "",
      terms: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string().required("Phone is required"),
      firstName: Yup.string()
        .min(2, "Must be atlest 2 characters")
        .required("First name is required"),
      otherName: Yup.string()
        .min(2, "Must be atlest 2 characters")
        .required("Other name is required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Password required")
        .matches(/[a-z]+/, "Must contain atleast one lowercase character")
        // .matches(/[A-Z]+/, "One uppercase character")
        // .matches(/[@$!%*#?&]+/, "One special character")
        .matches(/\d+/, "Must contain atleast one number"),
      passwordRepeat: Yup.string()
        .required("Confirm password required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      terms: Yup.string().required("You must accept the terms to proceed"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await registerUser(values);
        setIsLoading(false);
        formik.resetForm();
        timer = autoTimer(1000, navigate, "/login");
        //
      } catch (error) {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    dispatch(clearMessage());
    return () => clearTimeout(timer);
  }, []);

  const facebookLogin = async () => {
    window.open(
      "https://runor-backend.onrender.com/api/auth/facebook",
      "_self"
    );
  };

  const googleLogin = async () => {
    console.log("logging with google");
    window.open("https://runor-backend.onrender.com/api/auth/google", "_self");
  };
  const { pathname } = useLocation();

  return (
    <div className="signup">
      <div className="my-10 flex items-center justify-evenly">
        <h2
          className={`text-center text-xl w-full p-2 ${
            pathname === "/signup" ? " border-b-2 border-primary uppercase" : ""
          }`}>
          Sign up
        </h2>
        <Link
          to="/login"
          className={`text-center text-xl w-full bg-slate-100 p-2 border-b-2 underline uppercase`}>
          Login
        </Link>
      </div>
      <h2 className="font-semibold">Create an account</h2>
      <form onSubmit={formik.handleSubmit}>
        <FormError message={message} />
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" {...formik.getFieldProps("email")} />
          <FormInputError
            isTouched={formik.touched.email}
            errorMessage={formik.errors.email}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone number</label>
          <div>
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
          </div>
          <FormInputError
            isTouched={formik.touched.phoneNumber}
            errorMessage={formik.errors.phoneNumber}
          />
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-2">
          <div className="form-group">
            <label htmlFor="firstname">First name</label>
            <input
              type="text"
              id="firstname"
              {...formik.getFieldProps("firstName")}
            />
            <FormInputError
              isTouched={formik.touched.firstName}
              errorMessage={formik.errors.firstName}
            />
          </div>

          <div className="form-group">
            <label htmlFor="othername">Other name</label>
            <input
              type="text"
              id="othername"
              {...formik.getFieldProps("otherName")}
            />
            <FormInputError
              isTouched={formik.touched.otherName}
              errorMessage={formik.errors.otherName}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-col lg:flex-row">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={"password"}
              id="password"
              {...formik.getFieldProps("password")}
            />
            <FormInputError
              isTouched={formik.touched.password}
              errorMessage={formik.errors.password}
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordRepeat">Confirm password</label>
            <input
              type={"password"}
              id="passwordRepeat"
              {...formik.getFieldProps("passwordRepeat")}
            />
            <FormInputError
              isTouched={formik.touched.passwordRepeat}
              errorMessage={formik.errors.passwordRepeat}
            />
          </div>
        </div>

        <div className="bg-slate-200 p-2">
          <p>
            If you are a service provider, your number will be displayed so that
            clients can contact you.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              {...formik.getFieldProps("terms")}
            />
            <label htmlFor="terms">Yes I agree</label>
          </div>
          <FormInputError
            isTouched={formik.touched.terms}
            errorMessage={formik.errors.terms}
          />
        </div>

        <div className="flex justify-between items-center m2-5">
          <button
            className={`flex gap-2 items-center p-2 rounded-full font-bold text-white text-center my-4 px-4 ${
              isLoading ? "bg-slate-300" : "bg-primary"
            }`}
            type="submit"
            disabled={isLoading}>
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin text-white text-xl" />{" "}
                Signing up
              </>
            ) : (
              "Submit"
            )}
          </button>
          <div className="flex gap-2 items-center">
            <p>Sign up using</p>
            <Link onClick={facebookLogin}>
              <img
                src={facebookIcon}
                alt="google-icon"
                className="social-link"
              />
            </Link>
            <Link onClick={googleLogin}>
              <img
                src={googleIcon}
                alt="google-icon"
                className="social-link hover:scale-110"
              />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
