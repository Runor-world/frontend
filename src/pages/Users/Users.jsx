import React from "react";
import UserList from "../../components/UserList/UserList";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import UserStatusUpdateModal from "../../components/UserStatusUpdateModal/UserStatusUpdateModal";
import UserSearchBar from "../../components/UserSearchBar/UserSearchBar";
import { useGetAllUsersQuery } from "../../features/api/userApi";

const Users = () => {
  const { isOpened, selectedUser } = useSelector((store) => store.users);
  const { data, isLoading, isFetching } = useGetAllUsersQuery();

  if (isLoading && isFetching && !data) {
    return <Loading />;
  }
  return (
    <section className="flex flex-col gap-2">
      <UserSearchBar />

      <div className="py-2 bg-slate-100">Filter by</div>

      <div className="flex justify-between items-cetner">
        <h1 className="text-xl lg:text-xl font-semibold">
          Users ({data?.users?.length})
        </h1>
      </div>
      <UserList users={data?.users} />
      {isOpened && <UserStatusUpdateModal {...selectedUser} />}
    </section>
  );
};

export default Users;
