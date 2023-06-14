import React, { useState } from "react";
import { FaEdit, FaPen, FaUserEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import userIcon from "../../images/user.png";
import "./Profile.css";
import PersonalProfile from "../../components/PersonalProfile/PersonalProfile";
import PersonalProfileEditForm from "../../components/PersonalProfileEditForm/PersonalProfileEditForm";
import PhotoEdit from "../../components/PhotoEdit/PhotoEdit";
import Loading from "../../components/Loading/Loading";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";
import PhoneNumberForm from "../../components/PhoneNumberForm/PhoneNumberForm";
import { useGetAllProfilesQuery } from "../../features/api/profileApi";
import {
  useUpdateUserProfilePhotoMutation,
  useUpdateUserProfileBackgroundPhotoMutation,
} from "../../features/api/profileApi";

const Profile = () => {
  const [updateUserProfilePhoto] = useUpdateUserProfilePhotoMutation();
  const [updateUserProfileBackgroundPhoto] =
    useUpdateUserProfileBackgroundPhotoMutation();
  const { user } = useSelector((store) => store.auth);
  const { isOpened } = useSelector((store) => store.modal);
  const { data, isLoading, isFetching, isError } = useGetAllProfilesQuery();

  const [open, setOpen] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [showUserImageUploader, setShowUserImageUploader] = useState(false);

  if (isLoading && isFetching) {
    return <Loading />;
  }

  if (isError)
    return (
      <div className="flex  flex-col justify-center h-screen items-center text-center">
        <p>Something went wrong</p>
        <Link className="btn-dark" to={"/"}>
          Go Home
        </Link>
      </div>
    );
  return (
    <div className="profile bg-white text-black relative">
      <Header />
      <div className="relative mt-16">
        <header className="profile-header">
          <FaUserEdit
            className="text-xl text-primary absolute top-5 lg:top-8 right-5 z-20 bg-slate-500 rounded-full p-1 w-[40px] h-[40px]"
            onClick={() => setShowImageUploader(true)}
          />
          <div className="absolute text-white z-10 w-full h-full top-0 left-0 text-center flex flex-col gap-4 justify-center items-center">
            <h1 className="absolute top-16 font-bold text-2xl bg-black bg-opacity-60 p-3">
              W<span className="lowercase">elcome back,</span> {user.firstName}{" "}
              {user.otherName}
            </h1>
          </div>
          <img
            src={data?.personalProfile?.photo ?? userIcon}
            alt="user"
            className="profile-photo ring-2 ring-primary"
          />
          <FaPen
            className="text-white absolute bottom-16 z-20 right-1/2 bg-slate-500 rounded-full p-1 w-[30px] h-[30px]"
            onClick={() => setShowUserImageUploader(true)}
          />

          {/* overlay here */}
          <div className="w-full h-1/2 fixed top-0 left-0 z-0">
            <img
              src={data?.personalProfile?.backgroundPhoto ?? userIcon}
              alt="background"
              className="w-full h-fit object-cover"
            />
          </div>
        </header>
        <div className="profile-body">
          <PersonalProfile
            personalProfile={data?.personalProfile}
            user={user}
            setOpen={setOpen}
          />
          {open && (
            <PersonalProfileEditForm
              setOpen={setOpen}
              personalProfile={data?.personalProfile}
            />
          )}
          <section className="wrapper text-left">
            <div className="flex gap-2 items-center justify-center">
              <h2 className="font-bold text-center">Service profile</h2>
              {data?.serviceProfile ? (
                <Link to="/service-profile">
                  <FaEdit className="text-lg text-primary" />
                </Link>
              ) : null}
            </div>
            {data?.serviceProfile ? (
              <>
                <article>
                  <small className="text-primary">Account type </small>
                  <hr />
                  <p>{data?.serviceProfile?.accountType}</p>
                </article>
                <ol className="flex flex-col gap-4">
                  <small className="text-primary">
                    Offerred/consumed Services (
                    {data?.serviceProfile?.services?.length})
                  </small>
                  <hr />
                  {data?.serviceProfile?.services.map((service, index) => {
                    return (
                      <li className="bg-white p-2 relative" key={service._id}>
                        <span className="absolute -top-2 -left-2 ring-2 ring-primary w-5 h-5 text-center bg-white shadow-md text-primary rounded-full">
                          {index + 1}
                        </span>
                        <article>
                          <small className="">Service name</small>
                          <hr />
                          <p>{service.name}</p>
                        </article>
                        <article>
                          <small className="">Service Description</small>
                          <hr />
                          <p>{service.description}</p>
                        </article>
                      </li>
                    );
                  })}
                </ol>
              </>
            ) : (
              <div className="text-center flex flex-col gap-2 mt-2">
                <p>
                  Please create service profile to identify yourself as service
                  provider or consumer
                </p>
                <Link
                  className="my-2 p-2 px-4 text-white bg-primary rounded-full w-fit m-auto hover:bg-black hover:text-primary"
                  to="/service-profile">
                  Set service profile
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>
      {showImageUploader && (
        <PhotoEdit
          title={"Background image update/upload"}
          setShowImageUploader={setShowImageUploader}
          dispatcher={updateUserProfileBackgroundPhoto}
        />
      )}
      {showUserImageUploader && (
        <PhotoEdit
          title={"User image update/upload"}
          setShowImageUploader={setShowUserImageUploader}
          dispatcher={updateUserProfilePhoto}
        />
      )}
      {isOpened && (
        <ModalWrapper>
          <PhoneNumberForm />
        </ModalWrapper>
      )}
    </div>
  );
};

export default Profile;
