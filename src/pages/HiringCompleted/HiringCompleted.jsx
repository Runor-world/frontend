import React from "react";
import PropTypes from "prop-types";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { Link } from "react-router-dom";
import { FaCopy, FaEnvelope, FaPhone } from "react-icons/fa";
import Header from "../../components/Header/Header";
import HiringSuccess from "../../components/HiringSuccess/HiringSuccess";
import { useGetServiceManQuery } from "../../features/api/servicemanApi";

const HiringCompleted = () => {
  const { data, isLoading, isFetching, isError, error } =
    useGetServiceManQuery();
  return (
    <PageWrapper>
      <Header />
      <HiringSuccess serviceMan={serviceMan} />
    </PageWrapper>
  );
};

HiringCompleted.propTypes = {};

export default HiringCompleted;
