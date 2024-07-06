import { getUser, IUser } from "@/lib/actions/user.action";
import React from "react";

const UserInfo = async ({ userId }: { userId: string }) => {
  const user: IUser = await getUser(userId);
  const { baranggay, municipality, province, zipcode } = user;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex max-md:flex-col justify-between">
        <h3>Full Name</h3>
        <p className="text-end text-slate-500">
          {user.firstname} {user.lastname}
        </p>
      </div>
      <div className="flex justify-between">
        <h3>Email Address</h3>
        <p className="text-end text-slate-500">{user.email}</p>
      </div>
      <div className="flex justify-between">
        <h3>Address</h3>
        <p className="text-end text-slate-500">{`${zipcode}, ${baranggay}, ${municipality}, ${province}`}</p>
      </div>
      <div className="flex justify-between">
        <h3>Phone Number</h3>
        <p className="text-end text-slate-500">{user.phoneNumber}</p>
      </div>
    </div>
  );
};

export default UserInfo;
