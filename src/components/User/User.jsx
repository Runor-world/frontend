import React from "react";

const User = ({ user }) => {
  const { lastName, firstName, photo, active } = user;
  return (
    <article className="flex gap-2 lg:gap-4 p-2">
      <img src={photo} className="w-[50px] h-[50px] rounded-full" />
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{active ? "Yes" : "No"}</p>
    </article>
  );
};

export default User;
