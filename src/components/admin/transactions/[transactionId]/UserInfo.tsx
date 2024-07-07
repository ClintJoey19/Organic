import { getUser, IUser } from "@/lib/actions/user.action";
import React from "react";

const UserInfo = async ({ userId }: { userId: string }) => {
  const user: IUser = await getUser(userId);
  const { baranggay, municipality, province, zipcode } = user;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex max-md:flex-col justify-between gap-2">
        <h3>Full Name</h3>
        <p className="md:text-end text-slate-500 truncate">
          {user.firstname} {user.lastname}
        </p>
      </div>
      <div className="flex max-md:flex-col justify-between gap-2">
        <h3>Email Address</h3>
        <p className="md:text-end text-slate-500 truncate">{user.email}</p>
      </div>
      <div className="flex max-md:flex-col justify-between gap-2">
        <h3>Address</h3>
        <p className="md:text-end text-slate-500 truncate">{`${zipcode}, ${baranggay}, ${municipality}, ${province}`}</p>
      </div>
      <div className="flex max-md:flex-col justify-between gap-2">
        <h3>Phone Number</h3>
        <p className="md:text-end text-slate-500  truncate">
          {user.phoneNumber}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
