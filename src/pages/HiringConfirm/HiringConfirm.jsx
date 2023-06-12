import React from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import Header from "../../components/Header/Header";
import MainContentWrapper from "../../components/MainContentWrapper/MainContentWrapper";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import HiringWrapper from "../../components/HiringWrapper/HiringWrapper";
import HiringHeader from "../../components/HiringHeader/HiringHeader";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";
import HiringSuccess from "../../components/HiringSuccess/HiringSuccess";
import { useGetServiceManQuery } from "../../features/api/servicemanApi";
import { useHireServiceManMutation } from "../../features/api/hiringApi";
import { clearMessage } from "../../features/hiring/hiringSlice";

const HiringConfirm = () => {
  const { serviceManUserId } = useParams();
  const { data, isLoading, isFetching, isError, error } =
    useGetServiceManQuery(serviceManUserId);
  const [hireServiceMan] = useHireServiceManMutation();
  const { service, message, hiring } = useSelector((store) => store.hiring);
  const { isOpened } = useSelector((store) => store.modal);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (data?.serviceMan.services.length > 1) {
      navigate(`/hiring/${serviceManUserId}`);
    } else {
      navigate("/");
    }
    dispatch(clearMessage());
  };

  const handleConfirmClick = async () => {
    try {
      await hireServiceMan({
        serviceProvider: serviceManUserId,
        service: service._id,
      });
      // dispatch(openModal());
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading && isFetching && !data?.serviceMan) {
    return <Loading />;
  }
  if (isError)
    return (
      <div>
        <p>{error}</p>
      </div>
    );

  return (
    <PageWrapper>
      <Header />
      <MainContentWrapper>
        <HiringWrapper>
          <HiringHeader serviceMan={data?.serviceMan} title="Confirm hiring" />
          <div className="flex flex-col justify-between gap-10 items-center w-full p-2">
            <div className="text-center">
              <p>
                You are about to hire{" "}
                <q>
                  {data?.serviceMan?.user?.firstName}{" "}
                  {data?.serviceMan?.user?.lastName ??
                    data?.serviceMan.user?.otherName}
                </q>{" "}
                for <q> {service?.name}</q>
              </p>
            </div>
            <div className="flex justify-between gap-10 items-center w-full">
              <button
                className="btn-dark px-4 w-full"
                onClick={handleBackClick}>
                {data?.serviceMan?.services?.length > 1 ? "Back" : "Cancel"}
              </button>
              <button
                className={`btn-dark ${
                  !message.error ? "bg-slate-400" : "bg-primary"
                } font-semibold px-4 w-full`}
                disabled={!message.error}
                onClick={handleConfirmClick}>
                Confirm
              </button>
            </div>
          </div>
        </HiringWrapper>
      </MainContentWrapper>
      {isOpened && (
        <ModalWrapper>
          <HiringSuccess serviceMan={data?.serviceMan} hiring={hiring} />
        </ModalWrapper>
      )}
    </PageWrapper>
  );
};

export default HiringConfirm;
