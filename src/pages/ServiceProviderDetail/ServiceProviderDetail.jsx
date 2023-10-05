import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { useParams, Link } from "react-router-dom";
import { useGetServiceManQuery } from "../../features/api/servicemanApi";
import Header from "../../components/Header/Header";
import avatarImage from "../../images/user.png";
import MainContentWrapper from "../../components/MainContentWrapper/MainContentWrapper";
import Footer from "../../components/Footer/Footer";
import Stars from "../../components/Stars/Stars";
import { HiPhone } from "react-icons/hi";
import { BiMap } from "react-icons/bi";
import { MdDangerous } from "react-icons/md";

const ServiceProviderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, isFetching, isError } = useGetServiceManQuery(id);

  if (isError)
    return (
      <div className="flex justify-center items-center text-red-600">
        <h1>Something went wrong!</h1>
      </div>
    );
  if (isLoading && isFetching) {
    return <Loading />;
  }
  const { services, profile, user } = data?.serviceMan;
  return (
    <section className="flex flex-col">
      <Header />
      <MainContentWrapper>
        <header className="rounded-md flex flex-col md:flex-row justify-between items-center gap-5 w-full text-black bg-gradient-to-tr from-cyan-200 to-slate-200 md:p-0">
          <div className="w-full h-fit">
            <img
              src={profile.photo || avatarImage}
              alt={user.firstName}
              height={300}
              width={400}
              className="object-contain aspect-auto rounded-t-md md:rounded-tr-none md:rounded-l-md h-auto "
            />
          </div>
          {/* personal details */}
          <div className="flex flex-col gap-1 justify-start item-center md:items-start w-full md:w-1/3 px-3 md:p-0">
            <div className="border-b-2 w-full mb-3 text-primary">
              <h1 className="text-4xl md:text-7xl font-bold">
                {services[0]?.name}
              </h1>
              <div className="flex gap-2 justify-start items-center">
                <BiMap className="" />
                <small>{user.location}</small>
              </div>
              {/* <div className="flex gap-2 justify-start items-center">
                <HiPhone className="" />
                <h3>{data?.serviceMan?.user?.phoneNumber}</h3>
              </div> */}
            </div>
            <h3 className="text-xl font-semibold text-slate-600">
              {user?.firstName} {user?.otherName}
            </h3>
            <div className="flex justify-start items-center gap-1">
              <small className="font-semibold">0 ratings</small>
              <Stars stars={0} />{" "}
              <small className="text-primary">(0) customers</small>
            </div>
          </div>
          {/* business details */}
          <div className="flex flex-col gap-2 justify-start">
            <h3></h3>
            <p>{data?.serviceMan?.profile?.address}</p>
            <div className="">
              <p>{data?.serviceMan?.profile.description}</p>
            </div>
          </div>
        </header>

        {/* body of the details */}
        <div className="flex flex-col gap-8 md:gap-10 px-2 md:px-5 mb-5">
          {/* top buttons  */}
          <div className="flex justify-between items-center gap-3">
            <button
              disabled={!data?.serviceMan?.user?.active}
              className={` ${
                !data?.serviceMan?.user?.active
                  ? "btn-dark px-4 line-through"
                  : "btn-dark group-hover:bg-slate-900"
              } bg-primary shadow-xl text-sm w-1/2 md:w-1/5`}>
              Hire now
            </button>
          </div>

          {/* description */}
          <div className="flex flex-col justify-start items-start gap-3">
            <h3 className="text-xl md:text-2xl font-semibold">
              Our Service Description
            </h3>
            <p>{services[0].description}</p>
          </div>
          {/* Customer's Reviews */}
          <div className="flex flex-col justify-start items-start gap-8">
            <h3 className="text-xl md:text-2xl font-semibold">
              Customer's Reviews (0)
            </h3>

            <div>{/* reviews from database */}</div>
          </div>
        </div>
      </MainContentWrapper>
      <Footer />
    </section>
  );
};

export default ServiceProviderDetail;
