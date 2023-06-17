import React from "react";
import { DateTime } from "../DateTime/DateTime";
import CopyText from "../CopyText/CopyText";
import { getStatusColor } from "../../utils/general";

export const AdminHiringItem = ({ hiring }) => {
  const {
    serviceProvider,
    serviceConsumer,
    service,
    serviceProviderProfile,
    createdAt,
    status,
  } = hiring;

  return (
    <article className="flex gap-5 flex-col justify-center items-center shadow-md rounded-md p-5 bg-slate-50">
      <div>
        <p>
          {serviceConsumer.firstName} {serviceConsumer.otherName}
        </p>
      </div>
      <div className="text-primary bg-black p-1 w-1/2 text-center">
        <p className="text-green">Hires</p>
      </div>
      <div className="flex flex-col items-center gap-2">
        <img
          src={serviceProviderProfile?.photo}
          alt={serviceProvider.firstName}
          className="h-20 w-20 lg:w-40 lg:h-40 ring-2 rounded-full ring-slate-400"
        />
        <div className="text-center">
          <p className="text-primary">
            {serviceProvider.firstName} {serviceProvider.otherName}
          </p>
          <CopyText text={serviceProvider.phoneNumber} />
        </div>
      </div>

      <h3>Service: {service.name}</h3>
      <DateTime dateTime={createdAt} />
      <div
        className={`${getStatusColor(
          status
        )} px-2 flex-1 rounded-full text-center animate-pulse`}>
        <small className="text-center">{status}</small>
      </div>
    </article>
  );
};
