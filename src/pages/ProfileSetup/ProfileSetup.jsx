import React from "react";
import UserServiceProfileForm from "../../components/UserServiceProfileForm/UserServiceProfileForm";
import "./ProfileSetup.css";
import providerImage from "../../images/electrician.jpg";
import consumerImage from "../../images/cleaner.jpg";
import Header from "../../components/Header/Header";
import { useGetServicesQuery } from "../../features/api/serviceApi";
import Loading from "../../components/Loading/Loading";
import { useGetAllProfilesQuery } from "../../features/api/profileApi";

const ProfileSetup = () => {
  const { data, isLoading, isFetching, isError, error } = useGetServicesQuery();
  const { data: profileData } = useGetAllProfilesQuery();

  if (isLoading && isFetching) return <Loading />;

  if (isError)
    return (
      <div className="flex items-center justify-center text-center">
        <p>{error}</p>
      </div>
    );

  return (
    <>
      <Header />
      <div className="profile-setup relative w-screen h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <img src={providerImage} alt="provider" />
          <img src={consumerImage} alt="consumer" />
        </div>
        <div className="overlay main-x-p mt-10 text-center text-black">
          <p className="text-xl text-black font-semibold mb-0 text-left lg:text-center">
            {profileData?.serviceProfile?.services?.length > 0
              ? "Update service profile"
              : "Set service profile"}
          </p>
          <hr className="border-2 rounded-full border-slate-400 w-full lg:w-1/2 mb-4" />
          <UserServiceProfileForm services={data?.services} />
        </div>
      </div>
    </>
  );
};

export default ProfileSetup;
